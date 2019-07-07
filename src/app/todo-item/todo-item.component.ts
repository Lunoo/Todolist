import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'todo-item',
    templateUrl: './todo-item.component.html'
})
export class TodoItemComponent {
    @Input() label: string;
    @Input() checked: boolean;

    @Output() edit: EventEmitter<string> = new EventEmitter();
    @Output() delete: EventEmitter<void> = new EventEmitter();
}
