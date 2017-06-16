import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import firebase from "firebase/app";
import { LoadingController, Loading, AlertController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class AuthProvider {
  public loading: Loading;

  constructor(
    public afAuth: AngularFireAuth,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public af: AngularFireDatabase,
    public alertCtrl: AlertController
  ) {}

  currentUserInfo(uid) {
    return firebase.database().ref("/users").child(uid);
  }

  loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  resetPassword(email: string): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }

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
