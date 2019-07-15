import { Component } from '@angular/core';
import { StateHistoryPlugin } from '@datorama/akita';

import { TodoQuery } from '../store/todo.query';

@Component({
    selector: 'action-bar',
    templateUrl: './action-bar.component.html'
})
export class ActionBarComponent {
    history: StateHistoryPlugin;

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
}
