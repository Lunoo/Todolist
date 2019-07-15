import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';

import { Todo } from '../models/todo';
import { TodoQuery } from './todo.query';
import { TodoStore } from './todo.store';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    constructor(private localStorage: LocalStorageService,
                private todoStore: TodoStore,
                private query: TodoQuery) {
        this.query.selectAll().subscribe((list) => {
           this.localStorage.setTodoList(list);
        });
    }

    add(todo: Todo): void {
        this.todoStore.add(todo);
    }

    edit(todo: Todo): void {
        this.todoStore.update(todo.id, todo);
    }

    delete(id: ID): void {
        this.todoStore.remove(id);
    }

    move(from: number, to: number): void {
        this.todoStore.move(from, to);
    }
}
