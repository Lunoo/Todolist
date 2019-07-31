import { Component } from '@angular/core';
import { User } from 'firebase';
import { Observable } from 'rxjs';

import { Theme } from '../../../models/settings';
import { AuthService } from '../../../core/auth.service';
import { SettingsQuery, SettingsService } from '../../../core/store';

@Component({
    selector: 'settings-dialog',
    templateUrl: './settings-dialog.component.html'
})
export class SettingsDialogComponent {
    synchronize$: Observable<boolean>;
    theme$: Observable<string>;
    user: User;

    constructor(private authService: AuthService,
                private settingsService: SettingsService,
                private settingsQuery: SettingsQuery) {
        this.synchronize$ = this.settingsQuery.synchronize$;
        this.theme$ = this.settingsQuery.theme$;
        this.user = this.authService.getCurrentUser();
    }

    onSynchronizeChange(synchronize: boolean): void {
        this.settingsService.update({synchronize});
    }

    onThemeChange(theme: Theme): void {
        this.settingsService.update({theme});
    }
}
