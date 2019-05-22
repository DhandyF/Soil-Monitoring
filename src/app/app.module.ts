import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const firebaseConfig = {
  apiKey: "AIzaSyB3Rda6Gy2SiIIFaeHTI3mAYp-JvPLWT_M",
  authDomain: "soil-monitoring-iot.firebaseapp.com",
  databaseURL: "https://soil-monitoring-iot.firebaseio.com",
  projectId: "soil-monitoring-iot",
  storageBucket: "soil-monitoring-iot.appspot.com",
  messagingSenderId: "1011841093594",
  appId: "1:1011841093594:web:123de6c3d7370a26"
};
 
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
