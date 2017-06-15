import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { IonicPage, NavController } from "ionic-angular";
import { Component } from "@angular/core";

//import { Snap } from '../snap/snap';
/**
* Generated class for the SignIn page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: "page-sign-in",
  templateUrl: "sign-in.html"
})
export class SignIn {
  constructor(public navCtrl: NavController, private firebaseServiceProvider: FirebaseServiceProvider) {
    firebaseServiceProvider.initializeLoginForm();
  }

  loginUser() {
    this.firebaseServiceProvider.login();
    this.navCtrl.setRoot("Snap");
  }

  goToResetPassword() {
    this.navCtrl.push("ResetPasswordPage");
  }

  createAccount() {
    this.navCtrl.push("SignupPage");
  }
}
