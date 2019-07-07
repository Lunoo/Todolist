import { animate, animateChild, group, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
    selector: 'todo-list',
    templateUrl: './todo-list.component.html',
    animations: [
        trigger('list', [
            transition(':enter', [
                query('@items', stagger(300, animateChild()))
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
export class TodoListComponent {
    movies = [
        'Episode I - The Phantom Menace',
        'Episode II - Attack of the Clones',
        'Episode III - Revenge of the Sith',
        'Episode IV - A New Hope',
        'Episode V - The Empire Strikes Backwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        'Episode VI - Return of the Jedi',
        'Episode VII - The Force Awakens',
        'Episode VIII - The Last Jedi'
    ];

    constructor(public dialog: MatDialog) {
    }

    drop(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    }

    deleteItem(index: number): void {
        this.movies.splice(index, 1);
    }

    openDialog(label: string, index: number): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '500px',
            data: {label: label}
        });

        dialogRef.afterClosed().subscribe((res: string) => {
            if (res) {
                this.movies[index] = res;
            }
        });
    }
}
