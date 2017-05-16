import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { CameraPreview } from '@ionic-native/camera-preview';

import { Firebase } from '@ionic-native/firebase';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignUp } from '../pages/sign-up/sign-up';
import { SignIn } from '../pages/sign-in/sign-in';
import { Snap } from '../pages/snap/snap';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

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
    MyApp,
    HomePage,
    SignIn,
    SignUp,
    Snap
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignIn,
    SignUp,
    Snap
  ],
  providers: [
    CameraPreview,
    Firebase,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
