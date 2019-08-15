import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;

@Directive({
    selector: '[passwordValidator][formControlName],[passwordValidator][formControl],[passwordValidator][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => PasswordValidatorDirective),
        multi: true
    }]
})
export class PasswordValidatorDirective implements Validator {
    validate(c: AbstractControl): ValidationErrors | null {
        const value: string = c.value;

        if (!value || !value.trim()) {
            return {
                code: 'required',
                message: 'Password is required.'
            };
        }

        if (value.length < 6) {
            return {
                code: 'minlength',
                message: 'Password should contain at least 6 characters.'
            };
        }

        if (!PASSWORD_PATTERN.test(value)) {
            return {
                code: 'pattern',
                message: `Password should contain at least one uppercase letter,
                          one uppercase letter and one number.`
            };
        }

        return null;
    }
}
