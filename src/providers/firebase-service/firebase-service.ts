import { LoadingController, Loading, AlertController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth-service/auth-service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase } from "angularfire2/database";
import { EmailValidator } from "../../validators/email";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import firebase from "firebase/app";
import "rxjs/add/operator/map";
import "rxjs/add/operator/first";
import "rxjs/add/operator/toPromise";
import { User } from "../../model/user";

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
  ) {
    console.log("Hello FirebaseServiceProvider Provider");
  }

  initializeLoginForm(): FormGroup {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ["", Validators.compose([Validators.minLength(6), Validators.required])]
    });

    return this.loginForm;
  }

  login(): firebase.Promise<any> {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      return this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(
        authData => {
          console.log("before dismiss");
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
    console.log("end login() from firebase-service");
  }

  /*currentUser(user): User {
    if (this.user == null) {
      this.storage.get("userUID").then(userUID => {
        console.log("current USERUID");
        console.log(userUID);
        this.authData.currentUserInfo(userUID).on("value", data => {
          this.user = new User(data.val().name, data.val().lastname, data.val().email, data.val().image);
          console.log(this.user);
          return this.user;
        });
      });
    }
    return this.user;
  }*/
}
