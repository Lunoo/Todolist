import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../../../shared/shared.module';
import { environment } from '../../../../environments/environment';
import { EmailValidationService } from '../../../services';
import { AuthDialogComponent } from './auth-dialog.component';

class EmailValidationServiceMock {
    checkEmail(): Promise<null> {
        return Promise.resolve(null);
    }
}

class MatDialogMock {
    close(): void {
    }
}

describe('AuthDialogComponent', () => {
    let component: AuthDialogComponent;
    let fixture: ComponentFixture<AuthDialogComponent>;

    let validFormValue = {
        email: 'test@test.com',
        password: '1234Ab'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.firebase),
                AngularFireAuthModule,
                BrowserAnimationsModule,
                SharedModule
            ],
            declarations: [
                AuthDialogComponent
            ],
            providers: [
                {provide: EmailValidationService, useClass: EmailValidationServiceMock},
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useClass: MatDialogMock},
            ]
        });

        fixture = TestBed.createComponent(AuthDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('onCreate should call authService.create, if form valid', fakeAsync(() => {
        spyOn(component['authService'], 'create').and.returnValue(Promise.resolve(null));

        component.onCreate();
        tick(2000);
        expect(component['authService'].create).not.toHaveBeenCalled();

        component.form.patchValue(validFormValue);
        tick(2000);
        component.onCreate();

        expect(component['authService'].create).toHaveBeenCalled();
    }));

    it('onSignIn should call authService.signIn, if form valid', fakeAsync(() => {
        spyOn(component['authService'], 'signIn').and.returnValue(Promise.resolve(null));

        component.onSignIn();
        tick(2000);
        expect(component['authService'].signIn).not.toHaveBeenCalled();

        component.form.patchValue(validFormValue);
        tick(2000);
        component.onSignIn();

        expect(component['authService'].signIn).toHaveBeenCalled();
    }));
});
