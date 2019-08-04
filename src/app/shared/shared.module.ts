import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { EmailValidatorDirective } from './email-validator.directive';
import { PasswordValidatorDirective } from './password-validator.directive';

@NgModule({
    declarations: [
        EmailValidatorDirective,
        PasswordValidatorDirective
    ],
    exports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        EmailValidatorDirective,
        PasswordValidatorDirective,
    ]
})

export class SharedModule {
}
