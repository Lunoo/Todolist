import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MenuBarComponent } from './menu-bar.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        MenuBarComponent,
        AuthDialogComponent,
        ProfileDialogComponent,
        SettingsDialogComponent,
    ],
    entryComponents: [
        AuthDialogComponent,
        ProfileDialogComponent,
        SettingsDialogComponent
    ],
    exports: [
        MenuBarComponent
    ]
})

export class MenuBarModule {
}
