import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { DialogModule } from '../dialog/dialog.module';
import { MaterialModule } from '../../shared/material.module';
import { Todo } from '../../models';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list.component';

class MatDialogMock {
    open(todo?: Todo) {
        return {
            afterClosed: () => of(todo)
        };
    }
}

describe('TodoListComponent', () => {
    let component: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

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
                DialogModule,
                MaterialModule
            ],
            declarations: [
                TodoListComponent,
                TodoItemComponent
            ]
        });

        fixture = TestBed.createComponent(TodoListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('itemTrackBy method should return id', () => {
        expect(component.itemTrackBy(0, todo)).toBe(1);
    });

    it('dropTodo method should call store.move', () => {
        spyOn(component['store'], 'move');

        component.dropTodo({} as any);

        expect(component['store'].move).toHaveBeenCalled();
    });

    it('createTodo method should call store.add', () => {
        spyOn(component['store'], 'add');

        component.createTodo(todo);

        expect(component['store'].add).toHaveBeenCalledWith(todo);
    });

    it('editTodo method should call store.edit', () => {
        spyOn(component['store'], 'edit');

        component.editTodo(todo);

        expect(component['store'].edit).toHaveBeenCalledWith(todo);
    });

    it('deleteTodo method should call store.delete', () => {
        spyOn(component['store'], 'delete');

        component.deleteTodo(todo.id);

        expect(component['store'].delete).toHaveBeenCalledWith(todo.id);
    });

    it('openDialog method should call dialog.open', () => {
        spyOn<any>(component['dialog'], 'open').and.returnValue(new MatDialogMock().open());

        component.openDialog();

        expect(component['dialog'].open).toHaveBeenCalled();
    });

    it('openDialog method should call createTodo after dialog closed, if todo.id doesn\'t exist', fakeAsync(() => {
        spyOn(component, 'createTodo');

        let newTodo = new Todo();
        spyOn<any>(component['dialog'], 'open').and.returnValue(new MatDialogMock().open(newTodo));

        component.openDialog();
        tick();

        expect(component.createTodo).toHaveBeenCalled();
    }));

    it('openDialog method should call editTodo after dialog closed, if todo.id exists', fakeAsync(() => {
        spyOn(component, 'editTodo');
        spyOn<any>(component['dialog'], 'open').and.returnValue(new MatDialogMock().open(todo));

        component.openDialog(todo);
        tick();

        expect(component.editTodo).toHaveBeenCalled();
    }));
});
