import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StateHistoryPlugin } from '@datorama/akita';

import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { SettingsQuery, SettingsService, TodoQuery } from '../../core/store';

@Component({
    selector: 'todo-menu',
    templateUrl: './menu-bar.component.html'
})
export class MenuBarComponent {
    showMenu: boolean = true;

    history: StateHistoryPlugin;
    user: boolean;

    constructor(private dialog: MatDialog,
                private settingsService: SettingsService,
                private settingsQuery: SettingsQuery,
                private todoQuery: TodoQuery) {
        this.history = new StateHistoryPlugin(this.todoQuery);

        this.settingsQuery.showMenu$.subscribe(show => {
            this.showMenu = show;
        });
    }

    hasFuture(): boolean {
        return this.history.hasFuture;
    }

    hasPast(): boolean {
        return this.history.hasPast;
    }

    back(): void {
        this.history.undo();
    }

    next(): void {
        this.history.redo();
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
