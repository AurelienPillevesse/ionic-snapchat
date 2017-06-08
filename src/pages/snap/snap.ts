import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { CameraPreview, CameraPreviewOptions } from "@ionic-native/camera-preview";

import { AngularFireDatabase } from "angularfire2/database";

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
  public picture: String;
  public displayFriendMenu: Boolean = false;
  public tookSnap: Boolean = false;
  public feed: String = "Feed";
  public user;
  private snaps: any;

  constructor(
    private cameraPreview: CameraPreview,
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private af: AngularFireDatabase
  ) {
    this.storage.get("user").then(val => {
      this.user = val;
    });
    this.snaps = af.list("/snaps");
  }

  ionViewDidLoad() {
    this.startCamera();
  }

  closeCamera() {
    this.cameraPreview.stopCamera();
  }

  switchCamera() {
    this.cameraPreview.switchCamera();
  }

  clickFriendMenu() {
    this.displayFriendMenu = true;
  }

  closeFriendMenu() {
    this.displayFriendMenu = false;
  }

  closeTookSnap() {
    this.tookSnap = false;
    this.startCamera();
  }

  takePicture() {
    const pictureOpts = {
      width: 1280,
      height: 1280,
      quality: 85
    };

    this.cameraPreview.takePicture(pictureOpts).then(
      imageData => {
        //this.cameraPreview.stopCamera();
        this.picture = "data:image/jpeg;base64," + imageData;
        this.tookSnap = true;
      },
      err => {
        console.log(err);
      }
    );
  }

  startCamera() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: "rear",
      toBack: true,
      tapPhoto: false,
      previewDrag: false,
      alpha: 1
    };

    // start camera
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  sendPicture() {
    this.uploadPicture(this.user.login, 10);
    this.tookSnap = false;
    //this.navCtrl.push("Feed");
  }

  uploadPicture(senderLogin: string, duration: number) {
    this.snaps.push({
      from: senderLogin,
      dataPicture: this.picture,
      duration: 10
    });
  }

  logout() {
    this.storage.remove("userId").then(() => {
      this.storage.remove("user").then(() => {
        this.navCtrl.setRoot("HomePage");
      });
    });
  }
}
