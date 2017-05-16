import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { CameraPreview } from '@ionic-native/camera-preview';

import { Firebase } from '@ionic-native/firebase';
import { MyApp } from './app.component';
/*import { HomePage } from '../pages/home/home';
import { SignUp } from '../pages/sign-up/sign-up';
import { SignIn } from '../pages/sign-in/sign-in';
import { Snap } from '../pages/snap/snap';*/

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
