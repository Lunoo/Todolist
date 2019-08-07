import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ID } from '@datorama/akita';

import { Todo } from '../../../models';

@Component({
    selector: 'todo-item',
    templateUrl: './todo-item.component.html'
})
export class TodoItemComponent {
    @Input('todo') set todoItem(todo: Todo) {
        this.todo = new Todo(todo);
    }

    @Output() checked: EventEmitter<Todo> = new EventEmitter();
    @Output() edit: EventEmitter<Todo> = new EventEmitter();
    @Output() delete: EventEmitter<ID> = new EventEmitter();
    @Output() move: EventEmitter<number> = new EventEmitter();

    todo: Todo;

    checkItem(completed: boolean): void {
        this.todo.completed = completed;
        this.checked.emit(this.todo);
    }
}
