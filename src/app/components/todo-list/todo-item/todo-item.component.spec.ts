import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Todo } from '../../../models';
import { MaterialModule } from '../../../shared';
import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
    let component: TodoItemComponent;
    let fixture: ComponentFixture<TodoItemComponent>;

    let todo: Todo = {
        completed: false,
        id: 1,
        title: 'Todo title'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule
            ],
            declarations: [
                TodoItemComponent
            ]
        });

        fixture = TestBed.createComponent(TodoItemComponent);
        component = fixture.componentInstance;
        component.todoItem = todo;
    });

    it('todoItem method should create todo', () => {
        expect(component.todo).toBeTruthy();
    });

    it('checkItem method should change todo.completed and emit checked event', () => {
        spyOn(component.checked, 'emit');

        component.checkItem(true);

        expect(component.todo.completed).toBe(true);
        expect(component.checked.emit).toHaveBeenCalled();
    });
});
