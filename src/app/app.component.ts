import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AngularFireAuth } from "angularfire2/auth";
import { Storage } from "@ionic/storage";
import { AuthProvider } from "../providers/auth-service/auth-service";
import { User } from "../model/user";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = "HomePage";

  constructor(
    platform: Platform,
    afAuth: AngularFireAuth,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    storage: Storage,
    authProvider: AuthProvider
  ) {
    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        authProvider.currentUserInfo(user.uid).on("value", data => {
          let user = new User(data.val().name, data.val().lastname, data.val().login, data.val().score);
          storage.set("user", user).then(() => {
            this.rootPage = "Snap";
            authObserver.unsubscribe();
          });
        });
      } else {
        this.rootPage = "HomePage";
        authObserver.unsubscribe();
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
