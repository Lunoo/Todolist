import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import 'firebase/firestore';
import { firestore, User } from 'firebase/app';
import Timestamp = firestore.Timestamp;

import { createSnapshot, stringToTimestamp, Todo, TodoStateSnapshot } from '../../models';
import { SettingsQuery, TodoQuery, TodoService, TodoState } from '../../store';
// import { AuthService, LogService, OnlineService } from '..';
import { AuthService } from '../auth/auth.service';
import { LogService } from '../log/log.service';
import { OnlineService } from '../online/online.service';

const TIME_DELAY = 20 * 1000;

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    private action$: Observable<Todo[]>;
    private canSync$: Observable<boolean>;

    private todoDoc: AngularFirestoreDocument<TodoStateSnapshot>;
    private todoState$: Observable<TodoStateSnapshot>;

    private cashedServerState: TodoStateSnapshot = null;
    private skipRequest: boolean;
    private subs: Subscription[] = [];
    private timeout: any;

    constructor(
        private authService: AuthService,
        private aFirestore: AngularFirestore,
        private logService: LogService,
        private onlineService: OnlineService,
        private settingsQuery: SettingsQuery,
        private todoQuery: TodoQuery,
        private todoService: TodoService,
    ) {
        this.action$ = this.todoQuery.todoList$;
        this.canSync$ = combineLatest(
            this.onlineService.isOnline$,
            this.settingsQuery.synchronize$,
            this.authService.user$
        ).pipe(map(([isOnline, isSync, isSignedIn]) => isOnline && isSync && !!isSignedIn));

        this.initTodoDoc();
        this.subscribeForUpdates();
    }

    createServer(state: TodoState): void {
        this.skipRequest = true;
        this.todoDoc.set(createSnapshot(state))
            .then(() => {
                this.cashedServerState = createSnapshot(this.todoQuery.getValue());
            })
            .catch(err => {
                this.logService.showMessage(err, 'error');
            })
            .finally(() => {
                setTimeout(() => this.skipRequest = false, 1000);
            });
    }

    updateLocal(state: TodoStateSnapshot, isCreated?: boolean): void {
        this.todoService.setState(state);
        this.logService.showMessage(`Todo list was ${isCreated ? 'loaded' : 'updated'}`, 'success');
    }

    updateServer(state: TodoState): void {
        this.skipRequest = true;
        this.todoDoc.update(createSnapshot(state))
            .then(() => {
                this.cashedServerState = createSnapshot(this.todoQuery.getValue());
            })
            .catch(err => {
                this.logService.showMessage(err, 'error');
            })
            .finally(() => setTimeout(() => this.skipRequest = false, 1000));
    }

    private checkUpdates(serverState: TodoStateSnapshot): void {
        const localState: TodoState = this.todoQuery.getValue();

        if (!serverState) {
            // create new document and collection on the server
            this.createServer(localState);
            return;
        }

        if (!localState.created) {
            // create local state
            this.updateLocal(serverState, true);
            this.todoService.clearHistory();
            return;
        }

        if (this.isLocalStateOutOfDate(localState.created, serverState.created) === true) {
            // update local state
            this.updateLocal(serverState);
        } else if (this.isLocalStateOutOfDate(localState.created, serverState.created) === false) {
            // update collection on the server
            this.updateServer(localState);
        }
    }

    private subscribeForUpdates(): void {
        this.canSync$.subscribe((canSync: boolean) => {
            if (canSync) {
                // subscribe to server changes
                const getSubs = this.todoState$
                    .pipe(
                        // ignore update from server after last action
                        filter(() => !this.skipRequest)
                    )
                    .subscribe(
                        state => {
                            this.cashedServerState = state;
                            this.checkUpdates(state);
                        },
                        err => {
                            this.logService.showMessage(err, 'error');
                        }
                    );

                // subscribe to local changes. Check only after TIME_DELAY since the last change
                const postSubs = this.action$
                    .pipe(
                        // ignore app initialization
                        filter(() => this.cashedServerState !== null)
                    )
                    .subscribe(() => {
                        clearTimeout(this.timeout);

                        this.timeout = setTimeout(() => {
                            this.checkUpdates(this.cashedServerState);
                        }, TIME_DELAY);
                    });

                this.subs = [getSubs, postSubs];
            } else {
                // unsubscribe to all changes
                this.subs.forEach(sub => sub.unsubscribe());
                clearTimeout(this.timeout);
            }
        });
    }

    private isLocalStateOutOfDate(localCreatedStr: string, serverCreated: Timestamp): boolean | null {
        const localCreated = stringToTimestamp(localCreatedStr);

        if (serverCreated.seconds > localCreated.seconds) {
            return true;
        }

        if (serverCreated.seconds < localCreated.seconds) {
            return false;
        }

        return null;
    }

    private initTodoDoc(): void {
        this.authService.user$.subscribe((user: User) => {
            if (user) {
                this.todoDoc = this.aFirestore.doc('todoList/' + user.email);
                this.todoState$ = this.todoDoc.valueChanges();
            }
        });
    }
}
