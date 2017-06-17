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
  /**
  * LoginForm that contains the form for the login
  */
  public loginForm: FormGroup;

  constructor(public navCtrl: NavController, private firebaseServiceProvider: FirebaseServiceProvider) {
    this.loginForm = firebaseServiceProvider.initializeLoginForm();
  }

  /**
  * Login method
  */
  loginUser() {
    this.firebaseServiceProvider.login().then(() => {
      this.navCtrl.setRoot("Snap");
    });
  }

  /**
  * Method that redirect to the SignUpPage
  */
  createAccount() {
    this.navCtrl.push("SignupPage");
  }
}
