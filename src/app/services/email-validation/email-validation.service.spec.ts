import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';

import { EmailValidationService } from './email-validation.service';

class AngularFireAuthMock {
    auth = {
        fetchSignInMethodsForEmail(email): Promise<string[]> {
            if (!email) {
                return Promise.reject('error');
            }

            return email === 'test@exist.com'
                ? Promise.resolve(['password'])
                : Promise.resolve([]);
        }
    };
}

describe('EmailValidationService', () => {
    let emailValidationService: EmailValidationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: AngularFireAuth, useClass: AngularFireAuthMock}
            ]
        });

        emailValidationService = TestBed.get(EmailValidationService);
    });

    it('checkEmail method should return "auth/exist-email" error', () => {
        emailValidationService.checkEmail('test@exist.com')
            .then((res) => {
                expect(res.code).toBe('auth/exist-email');
            });

    });

    it('checkEmail method should return null', () => {
        emailValidationService.checkEmail('test@test.com')
            .then((res) => {
                expect(res).toBeNull();
            });
    });

    it('checkEmail method should handle error', () => {
        emailValidationService.checkEmail('')
            .then((err) => expect(err).toBeTruthy());
    });
});
