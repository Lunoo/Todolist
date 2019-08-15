import { FormControl } from '@angular/forms';

import { PasswordValidatorDirective } from './password-validator.directive';

describe('PasswordValidatorDirective', () => {
    let directive: PasswordValidatorDirective;

    beforeEach(() => {
        directive = new PasswordValidatorDirective();
    });

    it('validate method should return required error', () => {
        let res = directive['validate'](new FormControl(' '));
        expect(res.code).toBe('required');
    });

    it('validate method should return minlength error', () => {
        let res = directive['validate'](new FormControl('12345'));
        expect(res.code).toBe('minlength');
    });

    it('validate method should return pattern error', () => {
        let res = directive['validate'](new FormControl('password'));
        expect(res.code).toBe('pattern');
    });

    it('validate method should return null', () => {
        let res = directive['validate'](new FormControl('Password11'));
        expect(res).toBeNull();
    });
});
