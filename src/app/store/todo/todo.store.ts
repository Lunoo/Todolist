import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { Todo } from '../../models/todo';

export interface TodoState extends EntityState<Todo> {
    created: string;
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'todo'})
export class TodoStore extends EntityStore<TodoState, Todo> {
    constructor() {
        super();
    }
}
