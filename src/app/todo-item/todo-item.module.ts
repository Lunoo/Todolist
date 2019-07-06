import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { TodoItemComponent } from './todo-item.component';

@NgModule({
    imports: [
        CommonModule,
        MatCheckboxModule,
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
