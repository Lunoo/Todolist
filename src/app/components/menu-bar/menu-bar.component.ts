import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { SettingsQuery, SettingsService, TodoService } from '../../core/store';
import { OnlineService } from '../../core/online.service';

@Component({
    selector: 'todo-menu',
    templateUrl: './menu-bar.component.html'
})
export class MenuBarComponent {
    isOnline$: Observable<boolean>;
    showMenu: boolean = true;
    user: boolean;

    constructor(private dialog: MatDialog,
                private onlineService: OnlineService,
                private settingsService: SettingsService,
                private settingsQuery: SettingsQuery,
                private todoService: TodoService) {
        this.isOnline$ = this.onlineService.isOnline$;

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

    openSettingsDialog(): void {
        this.dialog.open(SettingsDialogComponent);
    }

    toggleMenu(): void {
        this.settingsService.update({
            showMenu: !this.showMenu
        });
    }
}
