import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';

import { Todo } from '../../../models/todo';
import { TodoState, TodoStore } from './todo.store';

@Injectable({
    providedIn: 'root'
})
export class TodoQuery extends QueryEntity<TodoState> {
    todoList$: Observable<Todo[]> = this.selectAll();

    constructor(protected store: TodoStore) {
        super(store);
    }
}
