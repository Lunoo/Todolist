import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Todo } from '../../models/todo';

@Component({
    selector: 'todo-dialog',
    templateUrl: './dialog.component.html'
})
export class DialogComponent {
    @Input() todo: Todo;

    constructor(@Inject(MAT_DIALOG_DATA) public data: Todo,
                private dialogRef: MatDialogRef<DialogComponent>) {
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
