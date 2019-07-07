import { animate, animateChild, group, query, stagger, style, transition, trigger } from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DialogComponent } from './dialog/dialog.component';
import { TodoService, Task } from './todo.service';

@Component({
    selector: 'todo-list',
    templateUrl: './todo-list.component.html',
    animations: [
        trigger('list', [
            transition(':enter', [
                query('@items', stagger(300, animateChild()), {optional: true})
            ]),
        ]),
        trigger('items', [
            transition(':enter', [
                style({
                    height: 0,
                    transform: 'scale(0.5)',
                    opacity: 0
                }),
                group([
                    animate(
                        '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
                        style({
                            height: '*'
                        })
                    ),
                    animate(
                        '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
                        style({
                            transform: 'scale(1)',
                            opacity: 1
                        })
                    )
                ])
            ]),
            transition(':leave', [
                style({
                    transform: 'scale(1)',
                    opacity: 1,
                    height: '*'
                }),
                animate('.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
                    style({
                        transform: 'scale(0.5)',
                        opacity: 0,
                        height: '0',
                        margin: '0'
                    })
                )]
            )]
        )
    ]
})
export class TodoListComponent implements OnInit {
    tasks: Task[];

    constructor(public dialog: MatDialog,
                public service: TodoService) {
    }

    ngOnInit(): void {
        this.tasks = this.service.getTasks();
    }

    drop(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
        this.service.setTasks(this.tasks);
    }

    deleteItem(index: number): void {
        this.tasks.splice(index, 1);
        this.service.setTasks(this.tasks);
    }

    openDialog(label: string, index: number): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '500px',
            data: {label: label}
        });

        dialogRef.afterClosed().subscribe((res: string) => {
            if (!res) {
                return;
            }

            if (this.tasks[index]) {
                this.tasks[index].label = res;
            } else {
                this.tasks.push({
                    label: res,
                    checked: false
                });
            }

            this.service.setTasks(this.tasks);
        });
    }
}
