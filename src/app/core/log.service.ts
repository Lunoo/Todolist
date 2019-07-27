import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class LogService {
    constructor(private snackBar: MatSnackBar) {
    }

    showMessage(message: string, type?: 'success' | 'error'): void {
        this.snackBar.open(message, null, {
            panelClass: `todo-${type}`,
            duration: 5000,
        });
    }
}
