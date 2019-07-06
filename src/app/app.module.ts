import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoListModule } from './todo-list/todo-list.module';

@NgModule({
    imports: [
        BrowserModule,
        TodoListModule,
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {
}
