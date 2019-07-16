import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { Todo } from '../models/todo';

export interface TodoState extends EntityState<Todo> {
    created: string;
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'todo'})
export class TodoStore extends EntityStore<TodoState, Todo> {
    constructor() {
        super();
        this.setInitialState();
    }

    setInitialState(): void {
        const todoStateStr = localStorage.getItem('TodoList');
        const todoState: TodoState = JSON.parse(todoStateStr) || {};
        this.set(todoState.todo);
    }
}
