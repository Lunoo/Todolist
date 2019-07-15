import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { Todo } from '../models/todo';
import { LocalStorageService } from './local-storage.service';

export interface TodoState extends EntityState<Todo> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'todo'})
export class TodoStore extends EntityStore<TodoState, Todo> {
    constructor(private localStorage: LocalStorageService) {
        super();
        this.setInitialState();
    }

    setInitialState(): void {
        const todoList = this.localStorage.getTodoList();
        this.set(todoList);
    }
}
