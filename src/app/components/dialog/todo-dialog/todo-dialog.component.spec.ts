import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../../../shared/material.module';
import { Todo } from '../../../models';
import { TodoDialogComponent } from './todo-dialog.component';

class MatDialogMock {
    close(): void {
    }
}

describe('TodoDialogComponent', () => {
    let component: TodoDialogComponent;
    let fixture: ComponentFixture<TodoDialogComponent>;

    let todo: Todo = {
        completed: false,
        id: 1,
        title: 'Todo title'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                FormsModule,
                MaterialModule
            ],
            declarations: [
                TodoDialogComponent
            ],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useClass: MatDialogMock}
            ]
        });

        fixture = TestBed.createComponent(TodoDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('save method should trim todo.title and call dialogRef.close', () => {
        spyOn(component['dialogRef'], 'close');

        component.todo = todo;
        component.todo.title = ' Todo title ';
        component.save();

        expect(component['dialogRef'].close).toHaveBeenCalledWith(todo);
    });

    it('cancel method should call dialogRef.close without a value', () => {
        spyOn(component['dialogRef'], 'close');

        component.todo = todo;
        component.cancel();

        expect(component['dialogRef'].close).toHaveBeenCalledWith();
    });
});
