import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Todo } from '../../models';
import { MatDialogMock, SharedModule, TodoServiceMock } from '../../shared';
import { TodoService } from '../../store';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
    let component: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let dialog: MatDialog;
    let todoService: TodoService;

    let todo: Todo = {
        completed: false,
        id: 1,
        title: 'Todo title'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                DragDropModule,
                SharedModule
            ],
            declarations: [
                TodoListComponent,
                TodoItemComponent
            ],
            providers: [
                {provide: MatDialog, useClass: MatDialogMock},
                {provide: TodoService, useClass: TodoServiceMock},
            ]
        });

        dialog = TestBed.get(MatDialog);
        todoService = TestBed.get(TodoService);

        fixture = TestBed.createComponent(TodoListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('itemTrackBy method should return id', () => {
        expect(component.itemTrackBy(0, todo)).toBe(1);
    });

    it('dropTodo method should call store.move', () => {
        spyOn(todoService, 'move').and.callThrough();

        component.dropTodo({} as any);

        expect(todoService.move).toHaveBeenCalled();
    });

    it('createTodo method should call store.add', () => {
        spyOn(todoService, 'add').and.callThrough();

        component.createTodo(todo);

        expect(todoService.add).toHaveBeenCalledWith(todo);
    });

    it('editTodo method should call store.edit', () => {
        spyOn(todoService, 'edit').and.callThrough();

        component.editTodo(todo);

        expect(todoService.edit).toHaveBeenCalledWith(todo);
    });

    it('deleteTodo method should call store.delete', () => {
        spyOn(todoService, 'delete').and.callThrough();

        component.deleteTodo(todo.id);

        expect(todoService.delete).toHaveBeenCalledWith(todo.id);
    });

    it('openDialog method should call dialog.open', () => {
        spyOn<any>(dialog, 'open').and.returnValue(new MatDialogMock().open());

        component.openDialog();

        expect(dialog.open).toHaveBeenCalled();
    });

    it('openDialog method should call createTodo after dialog closed, if todo.id doesn\'t exist', fakeAsync(() => {
        spyOn(component, 'createTodo');

        let newTodo = new Todo();
        spyOn<any>(dialog, 'open').and.returnValue(new MatDialogMock().open(newTodo));

        component.openDialog();
        tick();

        expect(component.createTodo).toHaveBeenCalled();
    }));

    it('openDialog method should call editTodo after dialog closed, if todo.id exists', fakeAsync(() => {
        spyOn(component, 'editTodo');
        spyOn<any>(dialog, 'open').and.returnValue(new MatDialogMock().open(todo));

        component.openDialog(todo);
        tick();

        expect(component.editTodo).toHaveBeenCalled();
    }));
});
