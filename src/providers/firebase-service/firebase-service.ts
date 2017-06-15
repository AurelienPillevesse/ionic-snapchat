import { LoadingController, Loading, AlertController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth-service/auth-service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase } from "angularfire2/database";
import { EmailValidator } from "../../validators/email";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import "rxjs/add/operator/map";

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

  initializeLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ["", Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  login() {
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(
        authData => {
          this.loading.dismiss().then(() => {
            this.af.list("/users", { preserveSnapshot: true }).subscribe(users => {
              users.forEach(user => {
                if (this.loginForm.value.email == user.val().login) {
                  this.storage.set("userId", user.key).then(() => {
                    this.storage.set("user", user.val()).then(() => {
                      return; //this.navCtrl.setRoot("Snap");
                    });
                  });
                }
              });
            });
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

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  getAllSnap(snaps): any {
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
