import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuBarModule } from './menu-bar/menu-bar.module';
import { TodoListModule } from './todo-list/todo-list.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MenuBarModule,
        TodoListModule,
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {
}
