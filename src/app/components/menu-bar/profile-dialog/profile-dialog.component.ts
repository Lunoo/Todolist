import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from 'firebase';

import { AuthService } from '../../../core/auth.service';

@Component({
    selector: 'profile-dialog',
    templateUrl: './profile-dialog.component.html'
})
export class ProfileDialogComponent {
    user: User | null;

    constructor(
        private authService: AuthService,
        private dialogRef: MatDialogRef<ProfileDialogComponent>,
    ) {
        this.user = this.authService.getCurrentUser();
    }

    onSignOut(): void {
        this.authService.signOut()
            .finally(() => {
                this.dialogRef.close();
            });
    }
}
