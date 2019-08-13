import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';

import { LogService } from '../log/log.service';
import { TodoService } from '../../store';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user$: Observable<User | null>;

    constructor(private fireAuth: AngularFireAuth,
                private logService: LogService,
                private todoService: TodoService
    ) {
        this.user$ = this.fireAuth.user;
    }

    getCurrentUser(): User | null {
        return this.fireAuth.auth.currentUser;
    }

    create({email, password}): Promise<any> {
        return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.logService.showMessage('User was successfully created', 'success');
                this.todoService.cashLocalTodoList();
                this.todoService.clearState();
            })
            .catch(err => this.logService.showMessage(err, 'error'));
    }

    signIn({email, password}): Promise<any> {
        return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                this.todoService.cashLocalTodoList();
                this.todoService.clearState();
            })
            .catch(err => this.logService.showMessage(err, 'error'));
    }

    signOut(): Promise<any> {
        return this.fireAuth.auth.signOut()
            .then(() => {
                this.todoService.clearState();
                this.todoService.getLocalTodoListFromCash();
            })
            .catch(err => this.logService.showMessage(err, 'error'));
    }
}
