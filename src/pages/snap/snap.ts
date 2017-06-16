import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { PictureServiceProvider } from "../../providers/picture-service/picture-service";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { User } from "../../model/user";

import { AuthProvider } from "../../providers/auth-service/auth-service";
import { Storage } from "@ionic/storage";

/**
* Generated class for the Snap page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: "page-snap",
  templateUrl: "snap.html"
})
export class Snap {
  public feed: String = "Feed";
  public user: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pictureServiceProvider: PictureServiceProvider,
    private firebaseServiceProvider: FirebaseServiceProvider,
    public authData: AuthProvider,
    public storage: Storage
  ) {
    this.pictureServiceProvider.initialize();
  }

  ngOnInit() {
    //this.firebaseServiceProvider.currentUser(this.user);
    if (this.user == null) {
      this.storage.get("userUID").then(userUID => {
        console.log("current USERUID");
        console.log(userUID);
        this.authData.currentUserInfo(userUID).on("value", data => {
          this.user = new User(data.val().name, data.val().lastname, data.val().login, data.val().score);
          console.log(this.user);
        });
      });
    }
  }

  ionViewDidLoad() {
    this.pictureServiceProvider.startCamera();
  }

  closeCamera() {
    this.pictureServiceProvider.closeCamera();
  }

  switchCamera() {
    this.pictureServiceProvider.switchCamera();
  }

  clickFriendMenu() {
    this.pictureServiceProvider.clickFriendMenu();
  }

  closeFriendMenu() {
    this.pictureServiceProvider.closeFriendMenu();
  }

  closeTookSnap() {
    this.pictureServiceProvider.closeTookSnap();
  }

  takePicture() {
    this.pictureServiceProvider.takePicture();
  }

  sendPicture() {
    this.pictureServiceProvider.sendPicture(this.user);
  }

  logout() {
    this.pictureServiceProvider.logout().then(() => {
      console.log("before root");
      this.navCtrl.setRoot("HomePage");
      console.log("after root");
    });
  }
}
