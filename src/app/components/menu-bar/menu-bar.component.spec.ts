import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MaterialModule } from '../../shared/material.module';
import { environment } from '../../../environments/environment';
import { ProfileDialogComponent, SettingsDialogComponent } from '../dialog';
import { MenuBarComponent } from './menu-bar.component';

describe('ActionBarComponent', () => {
    let component: MenuBarComponent;
    let fixture: ComponentFixture<MenuBarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.firebase),
                AngularFireAuthModule,
                MaterialModule
            ],
            declarations: [
                MenuBarComponent
            ],
        });

        fixture = TestBed.createComponent(MenuBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('back method should call todoService.back', () => {
        spyOn(component['todoService'], 'back');

        component.back();

        expect(component['todoService'].back).toHaveBeenCalled();
    });

    it('next method should call todoService.next', () => {
        spyOn(component['todoService'], 'next');

        component.next();

        expect(component['todoService'].next).toHaveBeenCalled();
    });

    it('openAuthDialog method should call dialog.open', () => {
        spyOn(component['dialog'], 'open');

        component.openAuthDialog();

        expect(component['dialog'].open).toHaveBeenCalled();
    });

    it('openProfileDialog method should call dialog.open', () => {
        spyOn(component['dialog'], 'open');

        component.openProfileDialog();

        expect(component['dialog'].open).toHaveBeenCalledWith(ProfileDialogComponent);
    });

    it('openSettingsDialog method should call dialog.open', () => {
        spyOn(component['dialog'], 'open');

        component.openSettingsDialog();

        expect(component['dialog'].open).toHaveBeenCalledWith(SettingsDialogComponent);
    });

    it('toggleMenu method should call settingsService.update', () => {
        spyOn(component['settingsService'], 'update');

        component.toggleMenu();

        expect(component['settingsService'].update).toHaveBeenCalledWith({showMenu: false});
    });
});
