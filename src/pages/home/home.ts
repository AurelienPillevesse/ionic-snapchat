import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//import { SignUp } from '../sign-up/sign-up';
//import { SignIn } from '../sign-in/sign-in';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    signUp = 'SignUp';
    signIn = 'SignIn';

    constructor(public navCtrl: NavController, private storage: Storage) {
        if(this.storage.get('user')) {
            this.navCtrl.setRoot('Snap');
        }
    }

}
