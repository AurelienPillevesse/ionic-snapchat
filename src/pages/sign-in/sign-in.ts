import { Component } from '@angular/core';
import {
    IonicPage,
    NavController,
    LoadingController,
    Loading,
    AlertController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth-service/auth-service';
import { EmailValidator } from '../../validators/email';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


//import { Snap } from '../snap/snap';
/**
* Generated class for the SignIn page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
    selector: 'page-sign-in',
    templateUrl: 'sign-in.html',
})
export class SignIn {
    public loginForm:FormGroup;
    public loading:Loading;

    constructor(public navCtrl: NavController, public authData: AuthProvider,
        public formBuilder: FormBuilder, public alertCtrl: AlertController,
        public loadingCtrl: LoadingController, private storage: Storage,
        public angularfire: AngularFireDatabase) {

            this.loginForm = formBuilder.group({
                email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
                password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
            });
        }

        loginUser(){
            if (!this.loginForm.valid){
                console.log(this.loginForm.value);
            } else {
                this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
                .then( authData => {
                    this.loading.dismiss().then( () => {

                        this.angularfire.list('/users', {preserveSnapshot: true})
                        .subscribe(users => {
                            users.forEach(user => {
                                if(this.loginForm.value.email) {
                                    this.storage.set('userId', user.key);
                                    this.storage.set('user', user.val());
                                }
                            });
                        })

                        this.navCtrl.setRoot('Snap');
                    });
                }, error => {
                    this.loading.dismiss().then( () => {
                        let alert = this.alertCtrl.create({
                            message: error.message,
                            buttons: [
                                {
                                    text: "Ok",
                                    role: 'cancel'
                                }
                            ]
                        });
                        alert.present();
                    });
                });

                this.loading = this.loadingCtrl.create();
                this.loading.present();
            }
        }

        goToResetPassword(){
            this.navCtrl.push('ResetPasswordPage');
        }

        createAccount(){
            this.navCtrl.push('SignupPage');
        }
    }
