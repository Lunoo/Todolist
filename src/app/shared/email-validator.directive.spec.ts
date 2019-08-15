import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { EmailValidationServiceMock } from './test-mocks';
import { EmailValidationService } from '../services/email-validation';
import { EmailValidatorDirective } from './email-validator.directive';

describe('EmailValidatorDirective', () => {
    let directive: EmailValidatorDirective;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: EmailValidationService, useValue: EmailValidationServiceMock}
            ]
        });

        directive = new EmailValidatorDirective(EmailValidationServiceMock as any);
    });

    it('validateEmailPromise method should return required error', fakeAsync(() => {
        directive['validateEmailPromise']('').then((res) => {
            expect(res.code).toBe('required');
        });
    }));

    it('validateEmailPromise method should return pattern error', fakeAsync(() => {
        directive['validateEmailPromise']('invalid.email').then((res) => {
            expect(res.code).toBe('pattern');
        });
    }));

    it('validateEmailPromise method should work 2s after the last change', fakeAsync(() => {
        let result = [];

        directive['validateEmailPromise']('test@exist.com')
            .finally(() => result.push(1));
        directive['validateEmailPromise']('test@test.com')
            .finally(() => result.push(2));

        expect(result).toEqual([]);

        tick(2000);
        expect(result).toEqual([2]);
    }));

    it('validateEmailPromise method should return null for sign-in form', fakeAsync(() => {
        let promise = directive['validateEmailPromise']('test@exist.com');

        tick(2000);
        promise.then((res) => expect(res).toBeNull());
    }));

    it('validateEmailPromise method should return "auth/exist-email" error for registration form', fakeAsync(() => {
        directive.isRegistration = true;

        let promise = directive['validateEmailPromise']('test@exist.com');

        tick(2000);
        promise.then((res) => expect(res.code).toBe('auth/exist-email'));
    }));
});
