import { Injectable } from '@angular/core';
import { guid, ID, transaction } from '@datorama/akita';

import { Todo } from '../../../models/todo';
import { TodoState, TodoStore } from './todo.store';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    constructor(private todoStore: TodoStore) {
    }

    @transaction()
    add({title}: Todo): void {
        const newTodo = {
            id: guid(),
            completed: false,
            title
        } as Todo;

        this.todoStore.add(newTodo);
        this.addCreatedDate();
    }

    @transaction()
    edit(todo: Todo): void {
        this.todoStore.update(todo.id, todo);
        this.addCreatedDate();
    }

    @transaction()
    delete(id: ID): void {
        this.todoStore.remove(id);
        this.addCreatedDate();
    }

    @transaction()
    move(from: number, to: number): void {
        this.todoStore.move(from, to);
        this.addCreatedDate();
    }

    private addCreatedDate(): void {
        this.todoStore.update({
            created: new Date().toISOString()
        });
    }

    @transaction()
    setState(state: TodoState) {
        this.todoStore.set(state.entities);
        this.todoStore.update({
            created: state.created
        });
    }
}
