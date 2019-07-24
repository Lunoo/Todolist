import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { Settings } from '../../../models/settings';

export function createInitialState(): Settings {
    return new Settings();
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'settings'})
export class SettingsStore extends Store<Settings> {
    constructor() {
        super(createInitialState());
    }
}
