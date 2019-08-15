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
                {provide: AngularFireAuth, useClass: AngularFireAuthMock},
                {provide: LogService, useClass: LogServiceMock},
                {provide: TodoService, useClass: TodoServiceMock}
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
        spyOn(logService, 'showMessage').and.callThrough();
        spyOn(todoService, 'cashLocalTodoList').and.callThrough();
        spyOn(todoService, 'clearState').and.callThrough();

        authService.create(validData);
        tick();

        expect(logService.showMessage).toHaveBeenCalled();
        expect(todoService.cashLocalTodoList).toHaveBeenCalled();
        expect(todoService.clearState).toHaveBeenCalled();
    }));

    it('create method should handle error', fakeAsync(() => {
        spyOn(logService, 'showMessage').and.callThrough();

        authService.create(invalidData);
        tick();

        expect(logService.showMessage).toHaveBeenCalled();
    }));

    it('signIn method should clear state', fakeAsync(() => {
        spyOn(todoService, 'cashLocalTodoList').and.callThrough();
        spyOn(todoService, 'clearState').and.callThrough();

        authService.signIn(validData);
        tick();

        expect(todoService.cashLocalTodoList).toHaveBeenCalled();
        expect(todoService.clearState).toHaveBeenCalled();
    }));

    it('signIn method should handle error', fakeAsync(() => {
        spyOn(logService, 'showMessage').and.callThrough();

        authService.signIn(invalidData);
        tick();

        expect(logService.showMessage).toHaveBeenCalled();
    }));

    it('signOut method should recover cashed state', fakeAsync(() => {
        spyOn(todoService, 'clearState');
        spyOn(todoService, 'getLocalTodoListFromCash').and.callThrough();

        authService.signOut();
        tick();

        expect(todoService.getLocalTodoListFromCash).toHaveBeenCalled();
        expect(todoService.clearState).toHaveBeenCalled();
    }));

    it('signOut method should handle error', fakeAsync(() => {
        spyOn(logService, 'showMessage').and.callThrough();
        spyOn(angularFireAuth.auth, 'signOut').and.returnValue(Promise.reject());

        authService.signOut();
        tick();

        expect(logService.showMessage).toHaveBeenCalled();
    }));
});
