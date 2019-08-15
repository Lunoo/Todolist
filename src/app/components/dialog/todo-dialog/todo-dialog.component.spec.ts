import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Todo } from '../../../models';
import { MatDialogMock, SharedModule } from '../../../shared';
import { TodoDialogComponent } from './todo-dialog.component';

describe('TodoDialogComponent', () => {
    let component: TodoDialogComponent;
    let fixture: ComponentFixture<TodoDialogComponent>;
    let dialogRef: MatDialogRef<TodoDialogComponent>;

    let todo: Todo = {
        completed: false,
        id: 1,
        title: 'Todo title'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                SharedModule
            ],
            declarations: [
                TodoDialogComponent
            ],
            providers: [
                {provide: MatDialogRef, useValue: MatDialogMock},
                {provide: MAT_DIALOG_DATA, useValue: {}}
            ]
        });

        dialogRef = TestBed.get(MatDialogRef);

        fixture = TestBed.createComponent(TodoDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('save method should trim todo.title and call dialogRef.close', () => {
        spyOn(dialogRef, 'close');

        component.todo = todo;
        component.todo.title = ' Todo title ';
        component.save();

        expect(dialogRef.close).toHaveBeenCalledWith(todo);
    });

    it('cancel method should call dialogRef.close without a value', () => {
        spyOn(dialogRef, 'close');

        component.todo = todo;
        component.cancel();

        expect(dialogRef.close).toHaveBeenCalledWith();
    });
});
