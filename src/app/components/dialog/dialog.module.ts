import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        AuthDialogComponent,
        ProfileDialogComponent,
        SettingsDialogComponent,
        TodoDialogComponent,
    ],
    entryComponents: [
        AuthDialogComponent,
        ProfileDialogComponent,
        SettingsDialogComponent,
        TodoDialogComponent,
    ]
})

export class DialogModule {
}
