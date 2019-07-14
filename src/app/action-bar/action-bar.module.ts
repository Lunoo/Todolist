import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ActionBarComponent } from './action-bar.component';

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        ActionBarComponent
    ],
    exports: [
        ActionBarComponent
    ]
})

export class ActionBarModule {
}
