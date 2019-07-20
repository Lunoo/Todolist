import { Component, HostBinding } from '@angular/core';
import { StateHistoryPlugin } from '@datorama/akita';

import { TodoQuery } from '../store/todo.query';

@Component({
    selector: 'todo-menu',
    templateUrl: './menu-bar.component.html'
})
export class MenuBarComponent {
    @HostBinding('class.active') showMenu: boolean = true;

    history: StateHistoryPlugin;
    user: boolean;
    toggleButtonText: string = 'Hide menu';

    constructor(private query: TodoQuery) {
        this.history = new StateHistoryPlugin(this.query);
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

    toggleMenu(): void {
        this.showMenu = !this.showMenu;
        this.toggleButtonText = this.showMenu ? 'Hide menu' : 'Show menu';
    }
}
