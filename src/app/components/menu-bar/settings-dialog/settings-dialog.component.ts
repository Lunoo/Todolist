import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Theme } from '../../../models/settings';
import { SettingsQuery, SettingsService } from '../../../core/store';

@Component({
    selector: 'settings-dialog',
    templateUrl: './settings-dialog.component.html'
})
export class SettingsDialogComponent {
    synchronize$: Observable<boolean>;
    theme$: Observable<string>;

    constructor(private settingsService: SettingsService,
                private settingsQuery: SettingsQuery) {
        this.synchronize$ = this.settingsQuery.synchronize$;
        this.theme$ = this.settingsQuery.theme$;
    }

    onSynchronizeChange(synchronize: boolean): void {
        this.settingsService.update({synchronize});
    }

    onThemeChange(theme: Theme): void {
        this.settingsService.update({theme});
    }
}
