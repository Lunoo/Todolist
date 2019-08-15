import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthServiceMock, MaterialModule } from '../../../shared';
import { AuthService } from '../../../services/auth';
import { SettingsService } from '../../../store';
import { SettingsDialogComponent } from './settings-dialog.component';

describe('SettingsDialogComponent', () => {
    let component: SettingsDialogComponent;
    let fixture: ComponentFixture<SettingsDialogComponent>;
    let settingsService: SettingsService;

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

        settingsService = TestBed.get(SettingsService);

        fixture = TestBed.createComponent(SettingsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('onSynchronizeChange method should call settingsService.update', () => {
        spyOn(settingsService, 'update').and.callThrough();

        component.onSynchronizeChange(true);

        expect(settingsService.update).toHaveBeenCalledWith({synchronize: true});
    });

    it('onThemeChange method should call settingsService.update', () => {
        spyOn(settingsService, 'update').and.callThrough();

        component.onThemeChange('dark');

        expect(settingsService.update).toHaveBeenCalledWith({theme: 'dark'});
    });
});
