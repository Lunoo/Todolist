import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material';

import { DialogModule } from './dialog/dialog.module';
import { TodoItemModule } from './todo-item/todo-item.module';
import { TodoListComponent } from './todo-list.component';

@NgModule({
    imports: [
        CommonModule,
        DialogModule,
        DragDropModule,
        MatButtonModule,
        TodoItemModule,
    ],
    declarations: [
        TodoListComponent
    ],
    exports: [
        TodoListComponent
    ]
})

export class TodoListModule {
}
