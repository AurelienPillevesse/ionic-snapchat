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
  /**
    * SignUp variable to redirect to SignUp with LazyLoading page string
    */
  signUp: string = "SignUp";

  /**
    * SignIn variable to redirect to SignIn with LazyLoading page string
    */
  signIn: string = "SignIn";

  constructor(private alertCtrl: AlertController, public navCtrl: NavController) {}

  ionViewCanEnter() {}

  ionViewDidLoad() {}
}
