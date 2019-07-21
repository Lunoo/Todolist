import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Todo } from '../../../models/todo';

@Component({
    selector: 'todo-dialog',
    templateUrl: './todo-dialog.component.html'
})
export class TodoDialogComponent {
    @Input() todo: Todo;

    constructor(@Inject(MAT_DIALOG_DATA) public data: Todo,
                private dialogRef: MatDialogRef<TodoDialogComponent>) {
        this.todo = new Todo(data);
    }

    save(): void {
        this.todo.title = this.todo.title.trim();
        this.dialogRef.close(this.todo);
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
