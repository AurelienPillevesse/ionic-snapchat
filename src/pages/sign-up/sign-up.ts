import { Component } from '@angular/core';
//import { Http } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User} from '../../model/user'
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUp {
  public user: User = new User(null,null,null,null);
  public users:  FirebaseListObservable<User[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase) {
    //this.http = http;
    this.users = af.list('/users');
    console.log(af.list('/users'));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUp');
  }

  registerUser(){

    this.users.push({
      name: this.user.name,
      surname: this.user.surname,
      login: this.user.login,
      pass: this.user.pass,
    });
  }


}
