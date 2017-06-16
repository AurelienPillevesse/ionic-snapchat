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

/*
Generated class for the FirebaseServiceProvider provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseServiceProvider {
  public loginForm: FormGroup;
  public loading: Loading;

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
          console.log("before dismissLoading");
          return this.dismissLoading();
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

  dismissLoading(): Promise<any> {
    return this.loading.dismiss().then(() => {
      console.log("before loadUsers");
      return this.loadUsers();
    });
  }

  loadUsers(): Promise<any> {
    return this.af
      .list("/users", { preserveSnapshot: true })
      .map(users =>
        users.map(user => {
          if (this.loginForm.value.email == user.val().login) {
            console.log("before setAllStorageUser");
            return this.setStorageUserId(user);
          }
        })
      )
      .first()
      .toPromise();
  }

  setStorageUserId(user): Promise<any> {
    return this.storage.set("userId", user.key).then(() => {
      console.log("userid set");
      this.setStorageUser(user);
    });
  }

  setStorageUser(user): Promise<any> {
    return this.storage.set("user", user.val()).then(() => {
      console.log(user.val().login);
      console.log("user set");
      return;
    });
  }

  getAllSnap(snaps) {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.af.list("/snaps", { preserveSnapshot: true }).subscribe(dbSnaps => {
      dbSnaps.forEach(dbSnap => {
        snaps.push(dbSnap.val());
      });

      this.loading.dismiss();
    });
  }
}
