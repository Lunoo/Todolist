import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'todo-dialog',
    templateUrl: './dialog.component.html'
})
export class DialogComponent {
    @Input() label: string;

    constructor(
        private dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { label: string }
    ) {
        this.label = data.label;
    }

    save(): void {
        this.dialogRef.close(this.label);
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
