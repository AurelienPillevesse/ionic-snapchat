import { IonicPage, NavController, AlertController } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";

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

  ionViewCanEnter() {}

  ionViewDidLoad() {}
}
