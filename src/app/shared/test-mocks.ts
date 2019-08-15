import { of } from 'rxjs';

import { Todo } from '../models';

export class AngularFireAuthMock {
    auth = {
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
    };
}

export class AuthServiceMock {
    getCurrentUser() {
        return {
            email: '',
            metadata: {}
        };
    }

    create(): Promise<void> {
        return Promise.resolve();
    }

    signIn(): Promise<void> {
        return Promise.resolve();
    }

    signOut(): Promise<void> {
        return Promise.resolve();
    }
}

export class EmailValidationServiceMock {
    checkEmail(email: string): Promise<any> {
        return email === 'test@exist.com'
            ? Promise.resolve({code: 'auth/exist-email'})
            : Promise.resolve(null);
    }
}

export class LogServiceMock {
    showMessage(): void {}
}

export class MatDialogMock {
    close(): void {}

    open(todo?: Todo) {
        return {
            afterClosed: () => of(todo)
        };
    }
}

export class MatSnackBarMock {
    open(): void {}
}

export class StoreMock {
    update(): void {}
}

export class TodoServiceMock {
    history = {};

    add(): void {}

    back(): void {}

    clearState(): void {}

    cashLocalTodoList(): void {}

    delete(): void {}

    edit(): void {}

    getLocalTodoListFromCash(): void {}

    move(): void {}

    next(): void {}
}
