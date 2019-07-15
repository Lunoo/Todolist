import { ID } from '@datorama/akita';

export class Todo {
    id: ID;
    title: string;
    completed: boolean;

    constructor(data = {} as Todo) {
        this.id = data.id;
        this.title = data.title || '';
        this.completed = data.completed || false;
    }
}
