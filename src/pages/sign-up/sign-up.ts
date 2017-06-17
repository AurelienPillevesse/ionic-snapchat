import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { IonicPage, NavController } from "ionic-angular";
import { FormGroup } from "@angular/forms";
import { Component } from "@angular/core";

/**
 * The SignUp component
 *
 * Allows a user to register on the application.
 */
@IonicPage()
@Component({
  selector: "page-sign-up",
  templateUrl: "sign-up.html"
})
export class SignUp {
  /**
  * SignupForm that contains the form for the signup
  */
  public signupForm: FormGroup;

  /**
  * Constructor for SignUp page
  */
  constructor(public navCtrl: NavController, private firebaseServiceProvider: FirebaseServiceProvider) {
    this.signupForm = firebaseServiceProvider.initializeSignupForm();
  }

  /**
  * Signun for a user
  */
  signupUser() {
    this.firebaseServiceProvider.signup().then(
      () => {
        this.navCtrl.setRoot("Snap");
      },
      error => {
        this.navCtrl.setRoot("SignUp");
      }
    );
  }
}
