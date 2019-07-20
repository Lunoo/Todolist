import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';

import { Settings } from '../../models/settings';
import { SettingsStore } from './settings.store';

@Injectable({
    providedIn: 'root'
})
export class SettingsQuery extends Query<Settings> {
    showMenu$: Observable<boolean> = this.select('showMenu');
    synchronize$: Observable<boolean> = this.select('synchronize');
    theme$: Observable<string> = this.select('theme');

    constructor(protected store: SettingsStore) {
        super(store);
    }
}
