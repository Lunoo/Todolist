import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ActionBarModule } from './action-bar/action-bar.module';
import { TodoListModule } from './todo-list/todo-list.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ActionBarModule,
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
