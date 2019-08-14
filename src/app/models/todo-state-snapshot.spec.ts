import 'firebase/firestore';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

import { Todo } from './todo';
import { createSnapshot, stringToTimestamp, timestampToString } from './todo-state-snapshot';

describe('TodoStateSnapshot', () => {
    let todo: Todo = {
        id: 0,
        title: 'title',
        completed: false
    };

    it('createSnapshot method should work', () => {
        expect(createSnapshot({
            created: '2019-08-14T13:53:34.046Z',
            ids: [0],
            entities: {0: todo}
        })).toEqual({
            created: new Timestamp(1565790814, 46000000),
            entities: [todo]
        });
    });

    it('stringToTimestamp method should work', () => {
        expect(stringToTimestamp('2019-08-14T13:53:34.046Z'))
            .toEqual(new Timestamp(1565790814, 46000000));
    });

    it('timestampToString method should work', () => {
        expect(timestampToString(new Timestamp(1565790814, 46000000)))
            .toEqual('2019-08-14T13:53:34.000Z');
    });
});
