import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { AngularFireAuth } from "angularfire2/auth";
import { Component } from "@angular/core";
import { Platform } from "ionic-angular";

/**
 * The main component
 */
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  /**
    * RootPage variable to redirect to good page according to the user state (with LazyLoading page string)
    */
  rootPage: any = "HomePage";

  /**
    * Constructor of MyApp
    */
  constructor(platform: Platform, afAuth: AngularFireAuth, statusBar: StatusBar, splashScreen: SplashScreen) {
    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = "Snap";
        authObserver.unsubscribe();
      } else {
        this.rootPage = "HomePage";
        authObserver.unsubscribe();
      }
      splashScreen.hide();
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
    });
  }
}
