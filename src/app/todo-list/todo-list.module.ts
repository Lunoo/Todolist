import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { TodoListComponent } from './todo-list.component';

@NgModule({
    imports: [
        CommonModule,
        DragDropModule,
        MatCheckboxModule,
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
