import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { CameraPreview } from '@ionic-native/camera-preview';

import { Firebase } from '@ionic-native/firebase';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth-service/auth-service';
import { IonicStorageModule } from '@ionic/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyCe7MaeGS6o-Qtm1DjFGm6E9lwsB85QGJE",
  authDomain: "snapchat-ionic.firebaseapp.com",
  databaseURL: "https://snapchat-ionic.firebaseio.com",
  projectId: "snapchat-ionic",
  storageBucket: "snapchat-ionic.appspot.com",
  messagingSenderId: "328338315687"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    CameraPreview,
    Firebase,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthProvider
  ]
})
export class AppModule {}
