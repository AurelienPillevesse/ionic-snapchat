import { PictureServiceProvider } from "../../providers/picture-service/picture-service";
import { AuthProvider } from "../../providers/auth-service/auth-service";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { User } from "../../model/user";

/**
 * The Snap component
 *
 * Display the main view of the application, to take snaps.
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
    public authData: AuthProvider,
    public storage: Storage
  ) {
    this.pictureServiceProvider.initialize();
  }

  ngOnInit() {
    if (this.user == null) {
      this.storage.get("userUID").then(userUID => {
        this.authData.currentUserInfo(userUID).on("value", data => {
          this.user = new User(data.val().name, data.val().lastname, data.val().login, data.val().score);
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
      this.navCtrl.setRoot("HomePage");
    });
  }
}
