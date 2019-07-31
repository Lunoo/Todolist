import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { User } from 'firebase';
import { Observable } from 'rxjs';

import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { SettingsQuery, SettingsService, TodoService } from '../../core/store';
import { AuthService } from '../../core/auth.service';
import { OnlineService } from '../../core/online.service';

@Component({
    selector: 'todo-menu',
    templateUrl: './menu-bar.component.html'
})
export class MenuBarComponent {
    isOnline$: Observable<boolean>;
    showMenu: boolean = true;
    user$: Observable<User | null>;

    constructor(private auth: AuthService,
                private dialog: MatDialog,
                private onlineService: OnlineService,
                private settingsService: SettingsService,
                private settingsQuery: SettingsQuery,
                private todoService: TodoService) {
        this.isOnline$ = this.onlineService.isOnline$;
        this.user$ = this.auth.user$;

        this.settingsQuery.showMenu$.subscribe(show => {
            this.showMenu = show;
        });
    }

    hasFuture(): boolean {
        return this.todoService.history.hasFuture;
    }

    hasPast(): boolean {
        return this.todoService.history.hasPast;
    }

    back(): void {
        this.todoService.back();
    }

    next(): void {
        this.todoService.next();
    }

    openAuthDialog(isRegistration?: boolean): void {
        this.dialog.open(AuthDialogComponent, {
            data: {isRegistration}
        });
    }

    openProfileDialog(): void {
        this.dialog.open(ProfileDialogComponent);
    }

    openSettingsDialog(): void {
        this.dialog.open(SettingsDialogComponent);
    }

    toggleMenu(): void {
        this.settingsService.update({
            showMenu: !this.showMenu
        });
    }
}
