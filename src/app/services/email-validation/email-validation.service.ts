import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

interface ErrorResponse {
    code: string;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class EmailValidationService {
    constructor(private fireAuth: AngularFireAuth) {
    }

    checkEmail(email: string): Promise<ErrorResponse | null> {
        return this.fireAuth.auth.fetchSignInMethodsForEmail(email)
            .then((res: string[]) => {
                if (res.length) {
                    return {
                        code: 'auth/exist-email',
                        message: 'This email is already used by another user.'
                    };
                }

                return null;
            })
            .catch((err: ErrorResponse) => err);
    }
}
