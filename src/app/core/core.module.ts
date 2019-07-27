import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        SharedModule,
    ]
})

export class CoreModule {
}
