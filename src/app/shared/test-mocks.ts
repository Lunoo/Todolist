import { BehaviorSubject, of } from 'rxjs';

import 'firebase/firestore';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export const AngularFireAuthMock = {
    auth: {
        currentUser: null,
        createUserWithEmailAndPassword(email, password): Promise<void> {
            return email && password ? Promise.resolve() : Promise.reject();
        },
        fetchSignInMethodsForEmail(email): Promise<string | string[]> {
            if (!email) {
                return Promise.reject('error');
            }

            return email === 'test@exist.com'
                ? Promise.resolve(['password'])
                : Promise.resolve([]);
        },
        signInWithEmailAndPassword(email, password): Promise<void> {
            return email && password ? Promise.resolve() : Promise.reject();
        },
        signOut(): Promise<void> {
            return Promise.resolve();
        }
    }
};

export const AuthServiceMock = {
    user$: new BehaviorSubject(null),
    getCurrentUser() {
        return {
            email: '',
            metadata: {}
        };
    },
    create(): Promise<void> {
        return Promise.resolve();
    },
    signIn(): Promise<void> {
        return Promise.resolve();
    },
    signOut(): Promise<void> {
        return Promise.resolve();
    }
};

export const AngularFirestoreMock = {
    doc() {
        return this;
    },
    set() {
        return Promise.resolve();
    },
    update() {
        return Promise.resolve();
    },
    valueChanges() {
        return of({
            created: new Timestamp(1565790814, 0),
            entities: []
        });
    }
};

export const EmailValidationServiceMock = {
    checkEmail(email: string): Promise<any> {
        return email === 'test@exist.com'
            ? Promise.resolve({code: 'auth/exist-email'})
            : Promise.resolve(null);
    }
};

export const HistoryMock = {
    clear() {},
    ignoreNext() {},
    undo() {},
    redo() {}
};

export const LogServiceMock = {
    showMessage() {}
};

export const MatDialogMock = {
    close() {},
    open(todo?) {
        return {
            afterClosed: () => of(todo)
        };
    }
};

export const MatSnackBarMock = {
    open(): void {}
};

export const OnlineServiceMock = {
    isOnline$: of(true)
};

export const QueryMock = {
    todoList$: of(null),
    getValue() {
        return {
            created: '2019-08-14T13:53:34.046Z',
            ids: []
        };
    },
    pipe() {
        return this;
    },
    select() {
        return this;
    },
    subscribe() {}
};

export const SettingsQueryMock = {
    synchronize$: of(true)
};

export const StoreMock = {
    add() {},
    move() {},
    remove() {},
    set() {},
    update() {}
};

export const TodoServiceMock = {
    history: {},
    add() {},
    back() {},
    clearHistory() {},
    clearState() {},
    cashLocalTodoList() {},
    delete() {},
    edit() {},
    getLocalTodoListFromCash() {},
    move() {},
    next() {},
    setState() {}
};
