import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { AuthService } from '../../../core/auth.service';

export const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

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
            email: ['', [
                Validators.required,
                Validators.pattern(EMAIL_PATTERN)
            ]],
            password: ['', [
                Validators.required,
                Validators.minLength(6),
                Validators.pattern(PASSWORD_PATTERN)
            ]]
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
