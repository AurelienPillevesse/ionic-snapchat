import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  LoadingController,
  Loading,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth-service/auth-service';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUp {
public signupForm: FormGroup;
 loading: Loading;
 constructor(public navCtrl: NavController, public authProvider: AuthProvider,
   public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
   public alertCtrl: AlertController) {

     this.signupForm = formBuilder.group({
       email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
       password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
     });
   }

  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
   signupUser(){
   if (!this.signupForm.valid){
     console.log(this.signupForm.value);
   } else {
     this.authProvider.signupUser(this.signupForm.value.email,
         this.signupForm.value.password)
     .then(() => {
       this.loading.dismiss().then( () => {
         this.navCtrl.setRoot('Snap');
       });
     }, (error) => {
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
}
