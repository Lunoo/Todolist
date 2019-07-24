import { Injectable } from '@angular/core';

import { Settings } from '../../../models/settings';
import { SettingsStore } from './settings.store';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    constructor(private settingsStore: SettingsStore) {
    }

    update(settings: Partial<Settings>) {
        this.settingsStore.update(settings);
    }
}
