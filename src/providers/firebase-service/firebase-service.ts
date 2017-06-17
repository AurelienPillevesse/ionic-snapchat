import { LoadingController, Loading, AlertController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth-service/auth-service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase } from "angularfire2/database";
import { EmailValidator } from "../../validators/email";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { User } from "../../model/user";
import firebase from "firebase/app";

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
  * Login a user
  */
  login(): firebase.Promise<any> {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    if (this.loginForm.valid) {
      return this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(
        authData => {
          return this.loading.dismiss().then(() => {
            return this.storage.set("userUID", authData.uid);
          });
        },
        error => {
          this.loading.dismiss().then(() => {
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
          });
        }
      );
    }
  }
}
