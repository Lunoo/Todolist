import { async, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFireAuthMock } from '../../shared';
import { EmailValidationService } from './email-validation.service';

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

    it('checkEmail method should return "auth/exist-email" error', async(() => {
        emailValidationService.checkEmail('test@exist.com')
            .then((res) => {
                expect(res.code).toBe('auth/exist-email');
            });

    }));

    it('checkEmail method should return null', async(() => {
        emailValidationService.checkEmail('test@test.com')
            .then((res) => {
                expect(res).toBeNull();
            });
    }));

    it('checkEmail method should handle error', async(() => {
        emailValidationService.checkEmail('')
            .then((err) => expect(err).toBeTruthy());
    }));
});
