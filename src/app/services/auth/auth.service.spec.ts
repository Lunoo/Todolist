import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFireAuthMock, LogServiceMock, TodoServiceMock } from '../../shared';
import { AuthService } from './auth.service';
import { LogService } from '../log';
import { TodoService } from '../../store';

describe('AuthService', () => {
    let angularFireAuth: AngularFireAuth;
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
                {provide: AngularFireAuth, useValue: AngularFireAuthMock},
                {provide: LogService, useValue: LogServiceMock},
                {provide: TodoService, useValue: TodoServiceMock}
            ]
        });

        angularFireAuth = TestBed.get(AngularFireAuth);
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
        spyOn(angularFireAuth.auth, 'signOut').and.returnValue(Promise.reject());

        authService.signOut();
        tick();

        expect(logService.showMessage).toHaveBeenCalled();
    }));
});
