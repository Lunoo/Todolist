import { Directive, forwardRef, Input } from '@angular/core';
import { Validator, AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';

import { EmailValidationService } from '../core/email-validation.service';

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

    private validateEmailPromise(email: string) {
        clearTimeout(this.timeout);

        return new Promise(resolve => {
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
