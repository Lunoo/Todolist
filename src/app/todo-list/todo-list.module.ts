import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { SharedModule } from '../shared/shared.module';
import { DialogComponent } from './dialog/dialog.component';
import { TodoListComponent } from './todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
    imports: [
        DragDropModule,
        SharedModule,
    ],
    declarations: [
        DialogComponent,
        TodoListComponent,
        TodoItemComponent,
    ],
    entryComponents: [
        DialogComponent
    ],
    exports: [
        TodoListComponent
    ]
})

export class TodoListModule {
}
