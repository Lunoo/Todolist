import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { SharedModule } from '../shared/shared.module';
import { DialogModule } from './dialog/dialog.module';
import { TodoItemModule } from './todo-item/todo-item.module';
import { TodoListComponent } from './todo-list.component';

@NgModule({
    imports: [
        DialogModule,
        DragDropModule,
        SharedModule,
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
