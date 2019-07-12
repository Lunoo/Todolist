import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo';

@Component({
    selector: 'todo-item',
    templateUrl: './todo-item.component.html'
})
export class TodoItemComponent {
    @Input() todo: Todo;

    @Output() checked: EventEmitter<Todo> = new EventEmitter();
    @Output() edit: EventEmitter<Todo> = new EventEmitter();
    @Output() delete: EventEmitter<void> = new EventEmitter();

    checkItem(checked: boolean): void {
        this.todo.checked = checked;
        this.checked.emit(this.todo);
    }
}
