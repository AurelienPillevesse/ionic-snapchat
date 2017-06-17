import { LoadingController, Loading, AlertController } from "ionic-angular";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import * as firebase from "firebase/app";

/**
* Authentication service
*/
@Injectable()
export class AuthProvider {
  /**
    * Instance of Loading for the loading spinner
    */
  public loading: Loading;

  /**
    * Constructor of AuthProvider
    */
  constructor(
    public afAuth: AngularFireAuth,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public af: AngularFireDatabase,
    public alertCtrl: AlertController
  ) {}

  /**
  * Get informations about the user thanks to its UID with firebase
  */
  currentUserInfo(uid) {
    return firebase.database().ref("/users").child(uid);
  }

  /**
  * Login a user
  */
  loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  /**
  * Reset a password
  */
  resetPassword(email: string): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  /**
  * Logout the current user
  */
  logoutUser(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }

  /**
    * Signun a new user
    */
  signupUser(newEmail: string, newPassword: string, lastName: string, name: string): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword).then(newUser => {
      firebase.database().ref("/users").child(newUser.uid).set({
        lastname: lastName,
        login: newEmail,
        name: name,
        score: 0
      });
    });
  }
}
