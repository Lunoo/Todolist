import { Component, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StateHistoryPlugin } from '@datorama/akita';

import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { SettingsService } from '../store/settings/settings.service';
import { SettingsQuery } from '../store/settings/settings.query';
import { TodoQuery } from '../store/todo/todo.query';

@Component({
    selector: 'todo-menu',
    templateUrl: './menu-bar.component.html'
})
export class MenuBarComponent {
    @HostBinding('class.active') showMenu: boolean = true;

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
        this.dialog.open(SettingsDialogComponent, {
            width: '480px'
        });
    }

    toggleMenu(): void {
        this.settingsService.update({
            showMenu: !this.showMenu
        });
    }
}
