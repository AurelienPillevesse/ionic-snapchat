import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { IonicPage, NavController } from "ionic-angular";
import { FormGroup } from "@angular/forms";
import { Component } from "@angular/core";

/**
 * The SignIn component
 *
 * Allows a user to login on the application.
 */
@IonicPage()
@Component({
  selector: "page-sign-in",
  templateUrl: "sign-in.html"
})
export class SignIn {
  public loginForm: FormGroup;

  constructor(public navCtrl: NavController, private firebaseServiceProvider: FirebaseServiceProvider) {
    this.loginForm = firebaseServiceProvider.initializeLoginForm();
  }

  loginUser() {
    this.firebaseServiceProvider.login().then(() => {
      this.navCtrl.setRoot("Snap");
    });
  }

  goToResetPassword() {
    this.navCtrl.push("ResetPasswordPage");
  }

  createAccount() {
    this.navCtrl.push("SignupPage");
  }
}
