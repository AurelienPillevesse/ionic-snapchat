import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignUp } from '../sign-up/sign-up';
import { SignIn } from '../sign-in/sign-in';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    signUp = SignUp;
    signIn = SignIn;

    constructor(public navCtrl: NavController) {

    }

}
