import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';

import { AuthService } from '../../../services';
import { ProfileDialogComponent } from './profile-dialog.component';

class AuthServiceMock {
    getCurrentUser() {
        return {
            email: '',
            metadata: {}
        };
    }

    signOut(): Promise<void> {
        return Promise.resolve();
    }
}

class MatDialogMock {
    close(): void {
    }
}

describe('ProfileDialogComponent', () => {
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

        fixture = TestBed.createComponent(ProfileDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('onSignOut method should call authService.signOut', () => {
        spyOn(component['authService'], 'signOut').and.callThrough();

        component.onSignOut();

        expect(component['authService'].signOut).toHaveBeenCalled();
    });
});
