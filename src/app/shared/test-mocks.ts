import { of } from 'rxjs';

import { Todo } from '../models';

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
    open(todo?: Todo) {
        return {
            afterClosed: () => of(todo)
        };
    }
};

export const MatSnackBarMock = {
    open(): void {}
};

export const QueryMock = {
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
    clearState() {},
    cashLocalTodoList() {},
    delete() {},
    edit() {},
    getLocalTodoListFromCash() {},
    move() {},
    next() {}
};
