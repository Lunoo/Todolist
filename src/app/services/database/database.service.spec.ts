import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { throwError } from 'rxjs';

import 'firebase/firestore';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

import { TodoStateSnapshot } from '../../models';
import {
    AngularFirestoreMock, AuthServiceMock, LogServiceMock,
    OnlineServiceMock, QueryMock, SettingsQueryMock, TodoServiceMock
} from '../../shared';
import { AuthService } from '../auth';
import { LogService } from '../log';
import { OnlineService } from '../online';
import { DatabaseService, TIME_DELAY } from './database.service';
import { SettingsQuery, TodoQuery, TodoService } from '../../store';

describe('DatabaseService', () => {
    let authService: AuthService;
    let logService: LogService;
    let service: DatabaseService;
    let todoService: TodoService;

    let todoState = {
        created: '2019-08-14T13:53:34.046Z',
        ids: []
    };

    let todoSnapshot: TodoStateSnapshot = {
        created: new Timestamp(1565790814, 0),
        entities: []
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: AuthService, useValue: AuthServiceMock},
                {provide: AngularFirestore, useValue: AngularFirestoreMock},
                {provide: LogService, useValue: LogServiceMock},
                {provide: OnlineService, useValue: OnlineServiceMock},
                {provide: SettingsQuery, useValue: SettingsQueryMock},
                {provide: TodoQuery, useValue: QueryMock},
                {provide: TodoService, useValue: TodoServiceMock}
            ]
        });

        authService = TestBed.get(AuthService);
        logService = TestBed.get(LogService);
        service = TestBed.get(DatabaseService);
        todoService = TestBed.get(TodoService);

        AuthServiceMock.user$.next({});
    });

    it('initTodoDoc method should init todoDoc/todoState$, if user exists', () => {
        expect(service['todoDoc']).toBeTruthy();
        expect(service['todoState$']).toBeTruthy();

        AuthServiceMock.user$.next(null);

        expect(service['todoDoc']).toBeNull();
        expect(service['todoState$']).toBeNull();
    });

    it('isLocalStateOutOfDate method should work', () => {
        let local = '2019-08-14T13:53:34.046Z';
        let server = new Timestamp(1565790814, 0);

        expect(service['isLocalStateOutOfDate'](local, server)).toBeNull();

        server = new Timestamp(1565790820, 0);
        expect(service['isLocalStateOutOfDate'](local, server)).toBe(true);

        server = new Timestamp(1565790810, 0);
        expect(service['isLocalStateOutOfDate'](local, server)).toBe(false);
    });

    it('createServer method should call todoDoc.set', fakeAsync(() => {
        spyOn(service['todoDoc'], 'set').and.callThrough();

        service['createServer'](todoState);
        tick(1000);

        expect(service['todoDoc'].set).toHaveBeenCalled();
        expect(service['cashedServerState']).toBeTruthy();
    }));

    it('createServer method should handle error', fakeAsync(() => {
        spyOn(service['todoDoc'], 'set').and.returnValue(Promise.reject('error'));
        spyOn(logService, 'showMessage');

        service['createServer'](todoState);
        tick(1000);

        expect(logService.showMessage).toHaveBeenCalled();
    }));

    it('updateServer method should call todoDoc.update', fakeAsync(() => {
        spyOn(service['todoDoc'], 'update').and.callThrough();

        service['updateServer'](todoState);
        tick(1000);

        expect(service['todoDoc'].update).toHaveBeenCalled();
        expect(service['cashedServerState']).toBeTruthy();
    }));

    it('updateServer method should handle error', fakeAsync(() => {
        spyOn(service['todoDoc'], 'update').and.returnValue(Promise.reject('error'));
        spyOn(logService, 'showMessage');

        service['updateServer'](todoState);
        tick(1000);

        expect(logService.showMessage).toHaveBeenCalled();
    }));

    it('updateLocal method should call todoService.setState', () => {
        spyOn(todoService, 'setState');

        service['updateLocal'](null);

        expect(todoService.setState).toHaveBeenCalled();
    });

    it('checkUpdates method should call createServer, if serverState doesn\'t exist', () => {
        spyOn(service, 'createServer');

        service['checkUpdates']();

        expect(service.createServer).toHaveBeenCalled();
    });

    it('checkUpdates method should call updateLocal, if localState.created doesn\'t exist', () => {
        spyOn(service, 'updateLocal').and.callThrough();
        spyOn(service['todoQuery'], 'getValue').and.returnValue({} as any);

        service['checkUpdates'](todoSnapshot);

        expect(service.updateLocal).toHaveBeenCalled();
    });

    it('checkUpdates method should call updateLocal, if localState.created doesn\'t exist', () => {
        spyOn(service, 'updateLocal').and.callThrough();
        spyOn(service['todoQuery'], 'getValue').and.returnValue({} as any);

        service['checkUpdates'](todoSnapshot);

        expect(service.updateLocal).toHaveBeenCalledWith(todoSnapshot, true);
    });

    it('checkUpdates method should call updateLocal, if localState out of date', () => {
        spyOn(service, 'updateLocal');

        let newTodoSnapshot = {
            created: new Timestamp(1565790820, 0),
            entities: []
        };
        service['checkUpdates'](newTodoSnapshot);

        expect(service.updateLocal).toHaveBeenCalledWith(newTodoSnapshot);
    });

    it('checkUpdates method should call updateServer, if serverState out of date', () => {
        spyOn(service, 'updateServer');

        let oldTodoSnapshot = {
            created: new Timestamp(1565790810, 0),
            entities: []
        };
        service['checkUpdates'](oldTodoSnapshot);

        expect(service.updateServer).toHaveBeenCalledWith(todoState);
    });

    it('checkUpdates method should do nothing, if localState equal to serverState', () => {
        spyOn(service, 'updateLocal');
        spyOn(service, 'updateServer');

        service['checkUpdates'](todoSnapshot);

        expect(service.updateLocal).not.toHaveBeenCalled();
        expect(service.updateServer).not.toHaveBeenCalled();
    });

    it('subscribeForUpdates method should subscribe to server and local changes', fakeAsync(() => {
        service['subscribeForUpdates']();
        tick(TIME_DELAY);

        expect(service['subs'].length).toBe(2);
    }));

    it('subscribeForUpdates method should unsubscribe to server and local changes', () => {
        AuthServiceMock.user$.next(null);
        service['subscribeForUpdates']();

        expect(service['subs'].length).toBe(0);
    });

    it('subscribeForUpdates method should call checkUpdates, if server changes', fakeAsync(() => {
        spyOn<any>(service, 'checkUpdates');

        service['subscribeForUpdates']();
        tick(TIME_DELAY);

        expect(service['cashedServerState']).toEqual(todoSnapshot);
        expect(service['checkUpdates']).toHaveBeenCalled();
    }));

    it('subscribeForUpdates method should handle error from server get request', () => {
        spyOn(logService, 'showMessage');
        service['todoState$'] = throwError('error');

        service['subscribeForUpdates']();

        expect(logService.showMessage).toHaveBeenCalled();
    });
});
