import { Injectable } from '@angular/core';
import { guid, ID, StateHistoryPlugin, transaction } from '@datorama/akita';

import { Todo } from '../../../models/todo';
import { TodoState, TodoStore } from './todo.store';
import { TodoQuery } from './todo.query';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    history: StateHistoryPlugin;

    constructor(private todoStore: TodoStore,
                private todoQuery: TodoQuery) {
        this.history = new StateHistoryPlugin(this.todoQuery);
    }

    back(): void {
        this.history.undo();
        this.history.ignoreNext();
        this.addCreatedDate();
    }

    next(): void {
        this.history.redo();
        this.history.ignoreNext();
        this.addCreatedDate();
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

    @transaction()
    setState({created, entities}: Partial<TodoState>): void {
        this.todoStore.set(entities);
        this.todoStore.update({created});
    }

    private addCreatedDate(): void {
        this.todoStore.update({
            created: new Date().toISOString()
        });
    }
}
