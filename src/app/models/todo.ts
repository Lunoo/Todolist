import { ID } from '@datorama/akita';

export class Todo {
    id: ID;
    title: string;
    completed: boolean;

    constructor({id, title, completed = false} = {} as Todo) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
}
