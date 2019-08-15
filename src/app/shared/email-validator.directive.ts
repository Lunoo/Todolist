import { Directive, forwardRef, Input } from '@angular/core';
import { Validator, AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';

import { EmailValidationService } from '../services';

const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

@Directive({
    selector: '[emailValidator][formControlName],[emailValidator][formControl],[emailValidator][ngModel]',
    providers: [{
        provide: NG_ASYNC_VALIDATORS,
        useExisting: forwardRef(() => EmailValidatorDirective),
        multi: true
    }]
})
export class EmailValidatorDirective implements Validator {
    @Input('emailValidator') isRegistration: boolean;

    private timeout: any;

    constructor(private emailValidationService: EmailValidationService) {
    }

    validate(c: AbstractControl): Promise<ValidationErrors | null> {
        return this.validateEmailPromise(c.value);
    }

    private validateEmailPromise(email: string): Promise<ValidationErrors | null> {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        return new Promise(resolve => {
            if (!email || !email.trim()) {
                return resolve({
                    code: 'required',
                    message: 'The email address is required.'
                });
            }

            if (!EMAIL_PATTERN.test(email)) {
                return resolve({
                    code: 'pattern',
                    message: 'The email address is badly formatted.'
                });
            }

            this.timeout = setTimeout(() => {
                this.emailValidationService.checkEmail(email)
                    .then(res => {
                        if (!this.isRegistration && res && res.code === 'auth/exist-email') {
                            resolve(null);
                        } else {
                            resolve(res);
                        }
                    });
            }, 2000);
        });
    }
}
