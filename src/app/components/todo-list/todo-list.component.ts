import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';

import { Todo } from '../../models';
import { TodoDialogComponent } from '../dialog';
import { TodoQuery, TodoService } from '../../store';
import { DeviceService } from '../../services';
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
    todoList$: Observable<Todo[]>;
    isMobile$: Observable<boolean>;

    constructor(private dialog: MatDialog,
                private deviceService: DeviceService,
                private query: TodoQuery,
                private todoService: TodoService) {
        this.isMobile$ = this.deviceService.isMobile$;
    }

    ngOnInit(): void {
        this.todoList$ = this.query.todoList$;
    }

    createTodo(todo: Todo): void {
        this.todoService.add(todo);
    }

    dropTodo(event: CdkDragDrop<Todo[]>): void {
        this.todoService.move(event.previousIndex, event.currentIndex);
    }

    editTodo(todo: Todo): void {
        this.todoService.edit(todo);
    }

    deleteTodo(todoId: ID): void {
        this.todoService.delete(todoId);
    }

    itemTrackBy(index: number, item: Todo): ID {
        return item.id;
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
                this.createTodo(res);
            }
        });
    }
}
