import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { SharedModule } from '../../shared/shared.module';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';
import { TodoListComponent } from './todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
    imports: [
        DragDropModule,
        SharedModule,
    ],
    declarations: [
        TodoDialogComponent,
        TodoListComponent,
        TodoItemComponent,
    ],
    entryComponents: [
        TodoDialogComponent
    ],
    exports: [
        TodoListComponent
    ]
})

export class TodoListModule {
}
