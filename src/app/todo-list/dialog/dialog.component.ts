import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Todo } from '../../models/todo';

@Component({
    selector: 'todo-dialog',
    templateUrl: './dialog.component.html'
})
export class DialogComponent {
    @Input() todo: Todo;

    constructor(
        private dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Todo
    ) {
        this.todo = data.id ? data : new Todo();
    }

    save(): void {
        this.todo.title = this.todo.title.trim();
        this.dialogRef.close(this.todo);
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
