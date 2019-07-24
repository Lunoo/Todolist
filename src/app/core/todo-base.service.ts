import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { SettingsQuery, TodoQuery, TodoService, TodoState } from './store';
import { OnlineService } from './online.service';

const TIME_DELAY = 10 * 1000;

@Injectable({
    providedIn: 'root'
})
export class TodoBaseService {
    serverTodoState: any;
    subs: Subscription;
    timeout: any;

    private todoDoc: AngularFirestoreDocument<TodoState>;
    private todoState$: Observable<TodoState>;

    private canSync$: Observable<boolean>;
    private isTimeDelayPassed$ = new BehaviorSubject(true);
    private todoListChanged$: Observable<any>;

    constructor(
        private firestore: AngularFirestore,
        private onlineService: OnlineService,
        private settingsQuery: SettingsQuery,
        private snackBar: MatSnackBar,
        private todoQuery: TodoQuery,
        private todoService: TodoService,
    ) {
        this.todoDoc = this.firestore.doc('todoList/admin');
        this.todoState$ = this.todoDoc.valueChanges();

        this.todoListChanged$ = this.todoQuery.todoList$;
        this.canSync$ = combineLatest(this.onlineService.isOnline$, this.settingsQuery.synchronize$)
            .pipe(map(([isOnline, isSync]) => isOnline && isSync));

        this.subscribeForUpdates();
    }

    sendTodoState(): void {
        let {entities, created} = this.todoQuery.getValue();
        this.todoDoc.update({entities, created});
    }

    subscribeForUpdates(): void {
        this.canSync$.subscribe((canSync: boolean) => {
            if (canSync) {
                let getSubs = this.todoState$.subscribe(state => {
                    this.serverTodoState = state;
                    this.checkForUpdates(state);
                });

                let postSubs = this.todoListChanged$.subscribe(() => {
                    clearTimeout(this.timeout);

                    this.timeout = setTimeout(() => {
                        this.checkForUpdates(this.serverTodoState);
                    }, TIME_DELAY);
                });

                this.subs = new Subscription().add(getSubs).add(postSubs);
            } else {
                clearTimeout(this.timeout);
                this.subs.unsubscribe();
            }
        });
    }

    checkForUpdates(serverState): void {
        if (!serverState) {
            return;
        }

        const serverCreatedDate = new Date(serverState.created);
        const currentCreatedDate = new Date(this.todoQuery.getValue().created);

        // console.log('checkForUpdates');
        if (serverCreatedDate.getTime() > currentCreatedDate.getTime()) {
            this.todoService.setState(serverState);
            this.showMessage('Local updated');
        } else if (serverCreatedDate.getTime() < currentCreatedDate.getTime()) {
            this.sendTodoState();
            this.showMessage('Server updated');
        }
    }

    private showMessage(message: string): void {
        this.snackBar.open(message, null, {
            duration: 2000,
        });
    }

    private triggerTimeDelayPassedEvent(): void {
        this.isTimeDelayPassed$.next(false);

        setTimeout(() => {
            this.isTimeDelayPassed$.next(true);
        }, TIME_DELAY);
    }
}
