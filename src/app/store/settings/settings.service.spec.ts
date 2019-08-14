import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';
import { SettingsStore } from './settings.store';

class StoreMock {
    update(): void {
    }
}

describe('SettingsService', () => {
    let settingsService: SettingsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: SettingsStore, useClass: StoreMock}
            ]
        });

        settingsService = TestBed.get(SettingsService);
    });

    it('update method should call settingsStore.update', () => {
        spyOn(settingsService['settingsStore'], 'update');

        settingsService.update({});

        expect(settingsService['settingsStore'].update).toHaveBeenCalledWith({});
    });
});
