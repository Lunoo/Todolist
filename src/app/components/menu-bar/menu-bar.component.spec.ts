import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';

import { AuthServiceMock, MatDialogMock, MaterialModule, TodoServiceMock } from '../../shared';
import { AuthService } from '../../services';
import { SettingsService, TodoService } from '../../store';
import { ProfileDialogComponent, SettingsDialogComponent } from '../dialog';
import { MenuBarComponent } from './menu-bar.component';

describe('ActionBarComponent', () => {
    let component: MenuBarComponent;
    let fixture: ComponentFixture<MenuBarComponent>;
    let dialog: MatDialog;
    let settingsService: SettingsService;
    let todoService: TodoService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule
            ],
            declarations: [
                MenuBarComponent
            ],
            providers: [
                {provide: AuthService, useClass: AuthServiceMock},
                {provide: MatDialog, useClass: MatDialogMock},
                {provide: TodoService, useClass: TodoServiceMock}
            ]
        });

        dialog = TestBed.get(MatDialog);
        settingsService = TestBed.get(SettingsService);
        todoService = TestBed.get(TodoService);

        fixture = TestBed.createComponent(MenuBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('back method should call todoService.back', () => {
        spyOn(todoService, 'back').and.callThrough();

        component.back();

        expect(todoService.back).toHaveBeenCalled();
    });

    it('next method should call todoService.next', () => {
        spyOn(todoService, 'next').and.callThrough();

        component.next();

        expect(todoService.next).toHaveBeenCalled();
    });

    it('openAuthDialog method should call dialog.open', () => {
        spyOn(dialog, 'open').and.callThrough();

        component.openAuthDialog();

        expect(dialog.open).toHaveBeenCalled();
    });

    it('openProfileDialog method should call dialog.open', () => {
        spyOn(dialog, 'open').and.callThrough();

        component.openProfileDialog();

        expect(dialog.open).toHaveBeenCalledWith(ProfileDialogComponent);
    });

    it('openSettingsDialog method should call dialog.open', () => {
        spyOn(dialog, 'open').and.callThrough();

        component.openSettingsDialog();

        expect(dialog.open).toHaveBeenCalledWith(SettingsDialogComponent);
    });

    it('toggleMenu method should call settingsService.update', () => {
        spyOn(settingsService, 'update').and.callThrough();

        component.toggleMenu();

        expect(settingsService.update).toHaveBeenCalledWith({showMenu: false});
    });
});
