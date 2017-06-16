import { Component } from "@angular/core";
import { IonicPage, NavController, AlertController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { SplashScreen } from "@ionic-native/splash-screen";

//import { SignUp } from '../sign-up/sign-up';
//import { SignIn } from '../sign-in/sign-in';

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  signUp = "SignUp";
  signIn = "SignIn";

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private storage: Storage,
    private splashScreen: SplashScreen
  ) {}

  ionViewCanEnter() {
    /*this.storage
      .get("user")
      .then(val => {
        console.log(val);
        if (val != null) {
          this.navCtrl.setRoot("Snap");
        }
      })
      .then(() => {
        this.splashScreen.hide();
    });*/
  }
}
