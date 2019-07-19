import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MenuBarComponent } from './menu-bar.component';

@NgModule({
    imports: [
        SharedModule,
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
