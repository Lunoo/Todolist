import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'todo-dialog',
    templateUrl: './dialog.component.html'
})
export class DialogComponent {
    @Input() text: string;

    constructor(
        private dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { text: string }
    ) {
        this.text = data.text;
    }

    save(): void {
        this.dialogRef.close(this.text.trim());
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
