import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { DialogModule } from '../dialog/dialog.module';
import { MenuBarComponent } from './menu-bar.component';

@NgModule({
    imports: [
        SharedModule,
        DialogModule
    ],
    declarations: [
        MenuBarComponent
    ],
    exports: [
        MenuBarComponent
    ]
})

export class MenuBarModule {
}
