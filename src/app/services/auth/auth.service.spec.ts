import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthService } from './auth.service';
import { LogService } from '..';
import { TodoService } from '../../store';

class AngularFireAuthMock {
    auth = {
        currentUser: null,
        createUserWithEmailAndPassword(email, password): Promise<void> {
            return email && password ? Promise.resolve() : Promise.reject();
        },
        signInWithEmailAndPassword(email, password): Promise<void> {
            return email && password ? Promise.resolve() : Promise.reject();
        },
        signOut(): Promise<void> {
            return Promise.resolve();
        }
    };
}

class LogServiceMock {
    showMessage(): void {}
}

class TodoServiceMock {
    clearState(): void {}
    cashLocalTodoList(): void {}
    getLocalTodoListFromCash(): void {}
}

describe('AuthService', () => {
    let authService: AuthService;
    let logService: LogService;
    let todoService: TodoService;

    let invalidData = {
        email: '',
        password: ''
    };
    let validData = {
        email: 'test@test@com',
        password: '1234Ab'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: AngularFireAuth, useClass: AngularFireAuthMock},
                {provide: LogService, useClass: LogServiceMock},
                {provide: TodoService, useClass: TodoServiceMock}
            ]
        });

        authService = TestBed.get(AuthService);
        logService = TestBed.get(LogService);
        todoService = TestBed.get(TodoService);
    });

    it('getCurrentUser method should return user', () => {
        expect(authService.getCurrentUser()).toBeNull();
    });

    it('create method should clear state and show message', fakeAsync(() => {
        spyOn(logService, 'showMessage');
        spyOn(todoService, 'cashLocalTodoList');
        spyOn(todoService, 'clearState');

        authService.create(validData);
        tick();

        expect(logService.showMessage).toHaveBeenCalled();
        expect(todoService.cashLocalTodoList).toHaveBeenCalled();
        expect(todoService.clearState).toHaveBeenCalled();
    }));

    it('create method should handle error', fakeAsync(() => {
        spyOn(logService, 'showMessage');

        authService.create(invalidData);
        tick();

        expect(logService.showMessage).toHaveBeenCalled();
    }));

    it('signIn method should clear state', fakeAsync(() => {
        spyOn(todoService, 'cashLocalTodoList');
        spyOn(todoService, 'clearState');

        authService.signIn(validData);
        tick();

        expect(todoService.cashLocalTodoList).toHaveBeenCalled();
        expect(todoService.clearState).toHaveBeenCalled();
    }));

    it('signIn method should handle error', fakeAsync(() => {
        spyOn(logService, 'showMessage');

        authService.signIn(invalidData);
        tick();

        expect(logService.showMessage).toHaveBeenCalled();
    }));

    it('signOut method should recover cashed state', fakeAsync(() => {
        spyOn(todoService, 'clearState');
        spyOn(todoService, 'getLocalTodoListFromCash');

        authService.signOut();
        tick();

        expect(todoService.getLocalTodoListFromCash).toHaveBeenCalled();
        expect(todoService.clearState).toHaveBeenCalled();
    }));

    it('signOut method should handle error', fakeAsync(() => {
        spyOn(logService, 'showMessage');
        spyOn(authService['fireAuth'].auth, 'signOut').and.returnValue(Promise.reject());

        authService.signOut();
        tick();

        expect(logService.showMessage).toHaveBeenCalled();
    }));
});
