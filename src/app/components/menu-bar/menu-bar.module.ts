import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MenuBarComponent } from './menu-bar.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        MenuBarComponent,
        SettingsDialogComponent
    ],
    entryComponents: [
        SettingsDialogComponent
    ],
    exports: [
        MenuBarComponent
    ]
})

export class MenuBarModule {
}
