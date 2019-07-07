import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../todo.service';

@Component({
    selector: 'todo-item',
    templateUrl: './todo-item.component.html'
})
export class TodoItemComponent {
    @Input() task: Task;

    @Output() checked: EventEmitter<void> = new EventEmitter();
    @Output() edit: EventEmitter<string> = new EventEmitter();
    @Output() delete: EventEmitter<void> = new EventEmitter();

    checkItem(checked: boolean): void {
        this.task.checked = checked;
        this.checked.emit();
    }
}
