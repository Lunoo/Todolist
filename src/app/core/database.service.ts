import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore, User } from 'firebase/app';
import Timestamp = firestore.Timestamp;
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { createSnapshot, stringToTimestamp, Todo, TodoStateSnapshot } from '../models';
import { SettingsQuery, TodoQuery, TodoService, TodoState } from './store';
import { AuthService } from './auth.service';
import { LogService } from './log.service';
import { OnlineService } from './online.service';

const TIME_DELAY = 10 * 1000;

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    private action$: Observable<Todo[]>;
    private canSync$: Observable<boolean>;

    private todoDoc: AngularFirestoreDocument<TodoStateSnapshot>;
    private todoState$: Observable<TodoStateSnapshot>;

    private canCheck: boolean = true;
    private serverTodoState: TodoStateSnapshot = null;
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
        this.todoDoc.set(createSnapshot(state))
            .catch(err => {
                this.logService.showMessage(err, 'error');
            });
    }

    updateLocal(state: TodoStateSnapshot): void {
        this.todoService.setState(state);
        this.logService.showMessage('Todo list was updated', 'success');
    }

    updateServer(state: TodoState): void {
        this.todoDoc.update(createSnapshot(state))
            .catch(err => {
                this.logService.showMessage(err, 'error');
            });
    }

    private checkUpdates(serverState: TodoStateSnapshot): void {
        const localState: TodoState = this.todoQuery.getValue();
        if (!this.canCheck || (!localState.created && !serverState)) {
            return;
        }

        if (!serverState) {
            // create new document and collection on the server
            this.createServer(localState);
            return;
        }

        if (
            !localState.created
            || this.isLocalStateOutOfDate(localState.created, serverState.created) === true
        ) {
            // update local state
            this.updateLocal(serverState);
        } else if (this.isLocalStateOutOfDate(localState.created, serverState.created) === false) {
            // update collection on the server
            this.updateServer(localState);
        }

        // ignore update from server after last action
        this.changeCanCheck();
    }

    private subscribeForUpdates(): void {
        this.canSync$.subscribe((canSync: boolean) => {
            if (canSync) {
                // subscribe to server changes
                const getSubs = this.todoState$.subscribe(
                    state => {
                        this.serverTodoState = state;
                        this.checkUpdates(state);
                    },
                    err => {
                        this.logService.showMessage(err, 'error');
                    }
                );

                // subscribe to local changes. Check only after TIME_DELAY since the last change
                const postSubs = this.action$
                    .pipe(filter(() => this.serverTodoState !== null))
                    .subscribe(() => {
                        clearTimeout(this.timeout);

                        this.timeout = setTimeout(() => {
                            this.checkUpdates(this.serverTodoState);
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

    private changeCanCheck(): void {
        this.canCheck = false;
        clearTimeout(this.timeout);

        setTimeout(() => this.canCheck = true, 2000);
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
