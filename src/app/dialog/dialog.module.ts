import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { DialogComponent } from './dialog.component';

@NgModule({
    imports: [
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
    ],
    declarations: [
        DialogComponent,
    ],
    entryComponents: [
        DialogComponent,
    ]
})

export class DialogModule {
}
