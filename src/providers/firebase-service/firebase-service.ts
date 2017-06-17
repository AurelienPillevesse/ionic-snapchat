import { LoadingController, Loading, AlertController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth-service/auth-service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase } from "angularfire2/database";
import { EmailValidator } from "../../validators/email";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { User } from "../../model/user";
import firebase from "firebase/app";

/*
Generated class for the FirebaseServiceProvider provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseServiceProvider {
  public loginForm: FormGroup;
  public loading: Loading;
  public user: User;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public af: AngularFireDatabase,
    public authData: AuthProvider,
    public storage: Storage
  ) {}

  /**
    * initialize a login form
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
