import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { PictureServiceProvider } from "../../providers/picture-service/picture-service";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pictureServiceProvider: PictureServiceProvider
  ) {
    this.pictureServiceProvider.initialize();
    console.log("initialize");
    this.pictureServiceProvider.getUserFromLocalStorageAndAllSnaps();
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
    this.pictureServiceProvider.sendPicture();
  }

  logout() {
    this.pictureServiceProvider.logout().then(() => {
      console.log("before root");
      this.navCtrl.setRoot("HomePage");
      console.log("after root");
    });
  }
}
