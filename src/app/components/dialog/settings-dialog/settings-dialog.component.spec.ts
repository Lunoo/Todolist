import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '../../../shared/material.module';
import { AuthService } from '../../../services/auth';
import { SettingsDialogComponent } from './settings-dialog.component';

class AuthServiceMock {
    getCurrentUser() {
        return {
            email: '',
            metadata: {}
        };
    }
}

describe('SettingsDialogComponent', () => {
    let component: SettingsDialogComponent;
    let fixture: ComponentFixture<SettingsDialogComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule
            ],
            declarations: [
                SettingsDialogComponent
            ],
            providers: [
                {provide: AuthService, useClass: AuthServiceMock}
            ]
        });

        fixture = TestBed.createComponent(SettingsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('onSynchronizeChange method should call settingsService.update', () => {
        spyOn(component['settingsService'], 'update');

        component.onSynchronizeChange(true);

        expect(component['settingsService'].update).toHaveBeenCalledWith({synchronize: true});
    });

    it('onThemeChange method should call settingsService.update', () => {
        spyOn(component['settingsService'], 'update');

        component.onThemeChange('dark');

        expect(component['settingsService'].update).toHaveBeenCalledWith({theme: 'dark'});
    });
});
