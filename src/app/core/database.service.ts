import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { LogService } from './log.service';
import { OnlineService } from './online.service';
import { SettingsQuery, TodoQuery, TodoService, TodoState } from './store';
import { Todo } from '../models/todo';

const TIME_DELAY = 5 * 1000;

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    private action$: Observable<Todo[]>;
    private canSync$: Observable<boolean>;
    private todoState$: Observable<TodoState>;

    private todoDoc: AngularFirestoreDocument<TodoState>;

    private canCheck: boolean = true;
    private serverTodoState: TodoState = null;
    private subs: Subscription[] = [];
    private timeout: any;

    constructor(
        private firestore: AngularFirestore,
        private logService: LogService,
        private onlineService: OnlineService,
        private settingsQuery: SettingsQuery,
        private todoQuery: TodoQuery,
        private todoService: TodoService,
    ) {
        this.todoDoc = this.firestore.doc('todoList/admin');
        this.todoState$ = this.todoDoc.valueChanges();

        this.action$ = this.todoQuery.todoList$;
        this.canSync$ = combineLatest(this.onlineService.isOnline$, this.settingsQuery.synchronize$)
            .pipe(map(([isOnline, isSync]) => isOnline && isSync));

        this.subscribeForUpdates();
    }

    createServer(state: TodoState): void {
        this.todoDoc.set(state)
            .catch(err => {
                this.logService.showMessage(err, 'error');
            });
    }

    updateLocal(state: TodoState): void {
        this.todoService.setState(state);
        this.logService.showMessage('Todo list was updated', 'success');
    }

    updateServer(state: TodoState): void {
        this.todoDoc.update(state)
            .catch(err => {
                this.logService.showMessage(err, 'error');
            });
    }

    private checkUpdates(serverState: TodoState): void {
        const localState: TodoState = this.todoQuery.getValue();
        if (!this.canCheck || !localState.created) {
            return;
        }

        if (!serverState) {
            // create new document and collection on the server
            this.createServer(localState);
            return;
        }

        if (this.isLocalStateOutOfDate(localState.created, serverState.created) === true) {
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

    private isLocalStateOutOfDate(localCreated: string, serverCreated: string): boolean | null {
        const localCreatedDate = new Date(localCreated);
        const serverCreatedDate = new Date(serverCreated);

        if (serverCreatedDate.getTime() > localCreatedDate.getTime()) {
            return true;
        }

        if (serverCreatedDate.getTime() < localCreatedDate.getTime()) {
            return false;
        }

        return null;
    }
}
