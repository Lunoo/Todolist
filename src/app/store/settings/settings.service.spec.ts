import { TestBed } from '@angular/core/testing';

import { StoreMock } from '../../shared';
import { SettingsService } from './settings.service';
import { SettingsStore } from './settings.store';

describe('SettingsService', () => {
    let settingsService: SettingsService;
    let settingsStore: SettingsStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: SettingsStore, useValue: StoreMock}
            ]
        });

        settingsService = TestBed.get(SettingsService);
        settingsStore = TestBed.get(SettingsStore);
    });

    it('update method should call settingsStore.update', () => {
        spyOn(settingsStore, 'update');

        settingsService.update({});

        expect(settingsStore.update).toHaveBeenCalledWith({});
    });
});
