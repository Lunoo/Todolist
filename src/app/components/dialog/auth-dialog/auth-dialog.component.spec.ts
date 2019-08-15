import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthServiceMock, EmailValidationServiceMock, MatDialogMock, SharedModule } from '../../../shared';
import { AuthService, EmailValidationService } from '../../../services';
import { AuthDialogComponent } from './auth-dialog.component';

describe('AuthDialogComponent', () => {
    let authService: AuthService;
    let component: AuthDialogComponent;
    let fixture: ComponentFixture<AuthDialogComponent>;

    let validFormValue = {
        email: 'test@test.com',
        password: '1234Ab'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                SharedModule
            ],
            declarations: [
                AuthDialogComponent
            ],
            providers: [
                {provide: AuthService, useClass: AuthServiceMock},
                {provide: EmailValidationService, useClass: EmailValidationServiceMock},
                {provide: MatDialogRef, useClass: MatDialogMock},
                {provide: MAT_DIALOG_DATA, useValue: {}}
            ]
        });

        authService = TestBed.get(AuthService);

        fixture = TestBed.createComponent(AuthDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('onCreate should call authService.create, if form valid', fakeAsync(() => {
        spyOn(authService, 'create').and.callThrough();

        component.onCreate();
        tick(2000);
        expect(component['authService'].create).not.toHaveBeenCalled();

        component.form.patchValue(validFormValue);
        tick(2000);
        component.onCreate();

        expect(authService.create).toHaveBeenCalled();
    }));

    it('onSignIn should call authService.signIn, if form valid', fakeAsync(() => {
        spyOn(authService, 'signIn').and.callThrough();

        component.onSignIn();
        tick(2000);
        expect(authService.signIn).not.toHaveBeenCalled();

        component.form.patchValue(validFormValue);
        tick(2000);
        component.onSignIn();

        expect(authService.signIn).toHaveBeenCalled();
    }));
});
