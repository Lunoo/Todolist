import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { SettingsQuery } from './core/store';

@Component({
    selector: 'todo-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    showMenu$: Observable<boolean>;

    constructor(private settingsQuery: SettingsQuery) {
        this.showMenu$ = this.settingsQuery.showMenu$;

        this.settingsQuery.theme$.subscribe((val: string) => {
            document.body.className = 'theme-' + val;
        });
    }
}