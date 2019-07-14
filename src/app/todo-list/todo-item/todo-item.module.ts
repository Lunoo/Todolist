import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { TodoItemComponent } from './todo-item.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        TodoItemComponent
    ],
    exports: [
        TodoItemComponent
    ]
})

export class TodoItemModule {
}
