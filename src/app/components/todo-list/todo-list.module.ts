import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { SharedModule } from '../../shared/shared.module';
import { DialogModule } from '../dialog/dialog.module';
import { TodoListComponent } from './todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
    imports: [
        DragDropModule,
        DialogModule,
        SharedModule
    ],
    declarations: [
        TodoListComponent,
        TodoItemComponent
    ],
    exports: [
        TodoListComponent
    ]
})

export class TodoListModule {
}
