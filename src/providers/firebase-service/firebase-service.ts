import { LoadingController, Loading, AlertController, ToastController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth-service/auth-service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase } from "angularfire2/database";
import { EmailValidator } from "../../validators/email";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { User } from "../../model/user";
import * as firebase from "firebase/app";

/**
* Firebase service
*/
@Injectable()
export class FirebaseServiceProvider {
  /**
  * Form to login
  */
  public loginForm: FormGroup;

  /**
  * Form to signup
  */
  public signupForm: FormGroup;

  /**
  * Instance of loading for loading spinner
  */
  public loading: Loading;

  /**
  * Current user
  */
  public user: User;

  /**
  * Constructor of FirebaseServiceProvider
  */
  constructor(
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public af: AngularFireDatabase,
    public authData: AuthProvider,
    public storage: Storage
  ) {}

  /**
  * Initialize a login form
  */
  initializeLoginForm(): FormGroup {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ["", Validators.compose([Validators.minLength(6), Validators.required])]
    });

    return this.loginForm;
  }

  /**
  * Initialize a singup form
  */
  initializeSignupForm(): FormGroup {
    this.signupForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, EmailValidator.isValid])],
      name: ["", Validators.compose([Validators.required])],
      lastname: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.minLength(6), Validators.required])]
    });

    return this.signupForm;
  }

  /**
  * Login a user
  */
  login(): firebase.Promise<any> {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    if (this.loginForm.valid) {
      return this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(
        authData => {
          return this.loading.dismiss().then(() => {
            return this.storage.set("userUID", authData.uid).then(() => this.showToast("Successfully login!"));
          });
        },
        error => {
          return this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: "cancel"
                }
              ]
            });
            alert.present();
            throw error;
          });
        }
      );
    }
  }

  /**
  * Signup a user
  */
  signup(): firebase.Promise<any> {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    if (this.signupForm.valid) {
      return this.authData
        .signupUser(
          this.signupForm.value.email,
          this.signupForm.value.password,
          this.signupForm.value.lastname,
          this.signupForm.value.name
        )
        .then(
          authData => {
            return this.loading.dismiss().then(() => {
              return this.storage.set("userUID", authData.uid).then(() => this.showToast("Successfully registered!"));
            });
          },
          error => {
            return this.loading.dismiss().then(() => {
              let alert = this.alertCtrl.create({
                message: error.message,
                buttons: [
                  {
                    text: "Ok",
                    role: "cancel"
                  }
                ]
              });
              alert.present();
              throw error;
            });
          }
        );
    }
  }

  /**
  * Logout the current user
  */
  logout(): firebase.Promise<any> {
    return this.authData.logoutUser().then(() => {
      return this.storage.remove("userUID");
    });
  }

  /**
  * Show a toast message
  */
  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: "middle"
    });

    toast.present();
  }
}
