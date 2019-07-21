import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';

import { Todo } from '../../models/todo';
import { todoAnimation } from './todo.animation';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';
import { TodoQuery, TodoService } from '../../store';

@Component({
    selector: 'todo-list',
    templateUrl: './todo-list.component.html',
    animations: [
        todoAnimation.todoList,
        todoAnimation.todoItem
    ]
})
export class TodoListComponent implements OnInit {
    todoList$: Observable<Todo[]>;

    constructor(private dialog: MatDialog,
                private query: TodoQuery,
                private store: TodoService) {
    }

    ngOnInit(): void {
        this.todoList$ = this.query.todoList$;
    }

    itemTrackBy(index: number, item: Todo): ID {
        return item.id;
    }

    drop(event: CdkDragDrop<Todo[]>): void {
        this.store.move(event.previousIndex, event.currentIndex);
    }

    createItem(todo: Todo): void {
        this.store.add(todo);
    }

    editTodo(todo: Todo): void {
        this.store.edit(todo);
    }

    deleteTodo(todoId: ID): void {
        this.store.delete(todoId);
    }

    openDialog(todo?: Todo): void {
        const dialogRef = this.dialog.open(TodoDialogComponent, {
            data: {...todo}
        });

        dialogRef.afterClosed().subscribe((res: Todo) => {
            if (!res) {
                return;
            }

            if (res.id) {
                this.editTodo(res);
            } else {
                this.createItem(res);
            }
        });
    }
}
