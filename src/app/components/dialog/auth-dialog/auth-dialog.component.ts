import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { AuthService } from '../../../services';

@Component({
    selector: 'settings-dialog',
    templateUrl: './auth-dialog.component.html'
})
export class AuthDialogComponent {
    isRegistration: boolean;
    form: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) data: { isRegistration: boolean },
        private authService: AuthService,
        private dialogRef: MatDialogRef<AuthDialogComponent>,
        private fb: FormBuilder,
    ) {
        this.isRegistration = data.isRegistration;

        this.form = this.fb.group({
            email: '',
            password: ''
        });
    }

    onSignIn(): void {
        if (this.form.valid) {
            this.authService.signIn(this.form.value)
                .finally(() => {
                    this.dialogRef.close();
                });
        }
    }

    onCreate(): void {
        if (this.form.valid) {
            this.authService.create(this.form.value)
                .finally(() => {
                    this.dialogRef.close();
                });
        }
    }
}
