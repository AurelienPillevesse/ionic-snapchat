import { IonicPage, NavController } from "ionic-angular";
import { Component } from "@angular/core";

/**
 * The home component
 *
 * Display buttons to go on signin or signup pages thanks to buttons.
 */
@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  signUp: string = "SignUp";
  signIn: string = "SignIn";

  constructor(private alertCtrl: AlertController, public navCtrl: NavController) {}

  ionViewCanEnter() {}

  ionViewDidLoad() {}
}
