import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Todo } from '../models/todo';
import { DialogComponent } from './dialog/dialog.component';
import { TodoService } from './todo.service';
import { todoAnimation } from './todo.animation';

@Component({
    selector: 'todo-list',
    templateUrl: './todo-list.component.html',
    animations: [
        todoAnimation.todoList,
        todoAnimation.todoItem
    ]
})
export class TodoListComponent implements OnInit {
    todoList: Todo[];

    constructor(public dialog: MatDialog,
                public service: TodoService) {
    }

    ngOnInit(): void {
        this.todoList = this.service.getTodoList();
    }

    drop(event: CdkDragDrop<Todo[]>): void {
        moveItemInArray(this.todoList, event.previousIndex, event.currentIndex);
        this.service.setTodoList(this.todoList);
    }

    deleteItem(index: number): void {
        this.todoList.splice(index, 1);
        this.service.setTodoList(this.todoList);
    }

    openDialog(text: string, index: number): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '480px',
            data: {text}
        });

        dialogRef.afterClosed().subscribe((res: string) => {
            if (!res) {
                return;
            }

            if (this.todoList[index]) {
                this.todoList[index].text = res;
            } else {
                this.todoList.push({
                    id: new Date().getTime(),
                    text: res,
                    checked: false
                });
            }

            this.service.setTodoList(this.todoList);
        });
    }
}
