import { TestBed, ComponentFixture } from '@angular/core/testing';

import { AuthServiceMock } from './shared';
import { AuthService } from './services/auth';
import { DatabaseService } from './services/database';
import { MenuBarModule } from './components/menu-bar/menu-bar.module';
import { TodoListModule } from './components/todo-list/todo-list.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MenuBarModule,
                TodoListModule
            ],
            declarations: [
                AppComponent
            ],
            providers: [
                {provide: AuthService, useClass: AuthServiceMock},
                {provide: DatabaseService, useValue: {}}
            ]
        });

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });
});
