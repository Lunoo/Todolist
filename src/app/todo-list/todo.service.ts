import { Injectable } from '@angular/core';

const STORAGE_KEY = 'todoList';

export interface Task {
    label: string;
    checked: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    setTasks(tasks: Task[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    getTasks(): Task[] {
        const tasks = localStorage.getItem(STORAGE_KEY);
        return tasks ? JSON.parse(tasks) : [];
    }
}
