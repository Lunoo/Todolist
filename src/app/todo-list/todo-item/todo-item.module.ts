import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { TodoItemComponent } from './todo-item.component';

@NgModule({
    imports: [
        CommonModule,
        MatCheckboxModule,
        MatIconModule,
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
