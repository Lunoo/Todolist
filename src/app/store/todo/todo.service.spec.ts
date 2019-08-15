import { TestBed } from '@angular/core/testing';
import { StateHistoryPlugin } from '@datorama/akita';

import { HistoryMock, QueryMock, StoreMock } from '../../shared';
import { TodoService } from './todo.service';
import { TodoQuery } from './todo.query';
import { TodoStore } from './todo.store';
import { Todo } from '../../models';

describe('TodoService', () => {
    let todoService: TodoService;
    let todoStore: TodoStore;

    let todo: Todo = {
        completed: false,
        id: 1,
        title: 'Todo title'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: TodoQuery, useValue: QueryMock},
                {provide: TodoStore, useValue: StoreMock}
            ]
        });

        todoService = TestBed.get(TodoService);
        todoStore = TestBed.get(TodoStore);
        todoService.history = HistoryMock as StateHistoryPlugin;
    });

    it('back method should call history.undo', () => {
        spyOn(todoService.history, 'undo');

        todoService.back();

        expect(todoService.history.undo).toHaveBeenCalled();
    });

    it('next method should call history.redo', () => {
        spyOn(todoService.history, 'redo');

        todoService.next();

        expect(todoService.history.redo).toHaveBeenCalled();
    });

    it('add method should call todoStore.add', () => {
        spyOn(todoStore, 'add');

        todoService.add(todo);

        expect(todoStore.add).toHaveBeenCalled();
    });

    it('edit method should call todoStore.edit', () => {
        spyOn(todoStore, 'update');

        todoService.edit(todo);

        expect(todoStore.update).toHaveBeenCalled();
    });

    it('delete method should call todoStore.delete', () => {
        spyOn(todoStore, 'remove');

        todoService.delete(todo.id);

        expect(todoStore.remove).toHaveBeenCalled();
    });

    it('move method should call todoStore.move', () => {
        spyOn(todoStore, 'move');

        todoService.move(0, 1);

        expect(todoStore.move).toHaveBeenCalledWith(0, 1);
    });

    it('setState method should call todoStore.set', () => {
        spyOn(todoStore, 'set');

        todoService.setState({created: {seconds: 0}} as any);

        expect(todoStore.set).toHaveBeenCalled();
    });

    it('clearHistory method should call history.clear', () => {
        spyOn(todoService.history, 'clear');

        todoService.clearHistory();

        expect(todoService.history.clear).toHaveBeenCalled();
    });

    it('clearState method should work', () => {
        spyOn(todoService.history, 'clear');
        spyOn(todoStore, 'set');
        spyOn(todoStore, 'update');

        todoService.clearState();

        expect(todoService.history.clear).toHaveBeenCalled();
        expect(todoStore.set).toHaveBeenCalledWith([]);
        expect(todoStore.update).toHaveBeenCalledWith({created: null});
    });

    it('cashLocalTodoList method should cash todoList to localStorage', () => {
        spyOn(localStorage, 'setItem');

        todoService.cashLocalTodoList();

        expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('getLocalTodoListFromCash method should call localStorage.getItem', () => {
        spyOn(localStorage, 'getItem').and.callThrough();

        todoService.getLocalTodoListFromCash();

        expect(localStorage.getItem).toHaveBeenCalled();
    });

    it('getLocalTodoListFromCash method should call todoService.setState, if item exists', () => {
        spyOn(todoService, 'setState');

        localStorage.removeItem('LocalTodoList');
        todoService.getLocalTodoListFromCash();
        expect(todoService.setState).not.toHaveBeenCalled();

        localStorage.setItem('LocalTodoList', '{"created":{"seconds":0,"nanoseconds":0},"entities":[]}');
        todoService.getLocalTodoListFromCash();
        expect(todoService.setState).toHaveBeenCalled();
    });
});
