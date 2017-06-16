import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { CameraPreview, CameraPreviewOptions } from "@ionic-native/camera-preview";
import { Storage } from "@ionic/storage";
import { AngularFireDatabase } from "angularfire2/database";

/*
Generated class for the PictureServiceProvider provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PictureServiceProvider {
  public picture: String;
  public displayFriendMenu: Boolean;
  public tookSnap: Boolean;
  public user;
  public snaps: any;

  constructor(private cameraPreview: CameraPreview, private storage: Storage, private af: AngularFireDatabase) {
    console.log("Hello PictureServiceProvider Provider");
  }

  initialize() {
    this.displayFriendMenu = false;
    this.tookSnap = false;
  }

  getUserFromLocalStorageAndAllSnaps() {
    this.storage.get("user").then(val => {
      this.user = val;
      console.log("getUserFromLocalStorageAndAllSnaps");
      console.log(this.user.login);
    });
    this.snaps = this.af.list("/snaps");
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

    this.cameraPreview.startCamera(cameraPreviewOpts);
  }

  closeCamera() {
    this.cameraPreview.stopCamera();
  }

  switchCamera() {
    this.cameraPreview.switchCamera();
  }

  takePicture() {
    const pictureOpts = {
      width: 1280,
      height: 1280,
      quality: 75
    };

    this.cameraPreview.takePicture(pictureOpts).then(
      imageData => {
        this.picture = "data:image/jpeg;base64," + imageData;
        this.tookSnap = true;
      },
      err => {}
    );
  }

  uploadPicture(senderLogin: string, duration: number) {
    this.snaps.push({
      from: senderLogin,
      dataPicture: this.picture,
      duration: duration
    });
  }

  closeTookSnap() {
    this.tookSnap = false;
    this.startCamera();
  }

  clickFriendMenu() {
    this.displayFriendMenu = true;
  }

  closeFriendMenu() {
    this.displayFriendMenu = false;
  }

  sendPicture() {
    this.uploadPicture(this.user.login, 10);
    this.tookSnap = false;
  }

  logout(): Promise<any> {
    return this.storage.remove("userId").then(() => {
      return this.storage.remove("user").then(() => {
        console.log("everything remove");
        return this.closeCamera();
      });
    });
  }
}
