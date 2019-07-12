import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

const STORAGE_KEY = 'todoList';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    setTodoList(list: Todo[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    getTodoList(): Todo[] {
        const list = localStorage.getItem(STORAGE_KEY);
        return list ? JSON.parse(list) : [];
    }
}
