import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';

import { AuthServiceMock, MatDialogMock } from '../../../shared';
import { AuthService } from '../../../services';
import { ProfileDialogComponent } from './profile-dialog.component';

describe('ProfileDialogComponent', () => {
    let authService: AuthService;
    let component: ProfileDialogComponent;
    let fixture: ComponentFixture<ProfileDialogComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProfileDialogComponent
            ],
            providers: [
                {provide: AuthService, useClass: AuthServiceMock},
                {provide: MatDialogRef, useClass: MatDialogMock}
            ]
        });

        authService = TestBed.get(AuthService);

        fixture = TestBed.createComponent(ProfileDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('onSignOut method should call authService.signOut', () => {
        spyOn(authService, 'signOut').and.callThrough();

        component.onSignOut();

        expect(authService.signOut).toHaveBeenCalled();
    });
});
