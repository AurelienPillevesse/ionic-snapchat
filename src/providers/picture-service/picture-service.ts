import { CameraPreview, CameraPreviewOptions } from "@ionic-native/camera-preview";
import { AngularFireDatabase } from "angularfire2/database";
import { LoadingController, Loading } from "ionic-angular";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { User } from "../../model/user";
import firebase from "firebase/app";

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
  public loading: Loading;
  public snaps: any;

  constructor(
    private cameraPreview: CameraPreview,
    private storage: Storage,
    private af: AngularFireDatabase,
    public loadingCtrl: LoadingController
  ) {}

  initialize() {
    this.displayFriendMenu = false;
    this.tookSnap = false;
    this.snaps = this.af.list("/snaps");
  }

  getAllSnap(snaps) {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.af.list("/snaps", { preserveSnapshot: true }).subscribe(dbSnaps => {
      dbSnaps.forEach(dbSnap => {
        snaps.push(dbSnap.val());
      });

      this.loading.dismiss();
    });
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

  sendPicture(user: User) {
    this.uploadPicture(user, 10);
    this.tookSnap = false;
  }

  uploadPicture(user: User, duration: number) {
    this.snaps.push({
      from: user.login,
      dataPicture: this.picture,
      duration: duration
    });
    this.updateUserScore(user);
  }

  updateUserScore(user: User) {
    user.score++;
    this.storage.get("userUID").then(userUID => {
      firebase.database().ref("/users").child(userUID).set({
        lastname: user.lastname,
        score: user.score,
        name: user.name,
        login: user.login
      });
    });
  }

  logout(): Promise<any> {
    return this.storage.remove("userUID").then(() => {
      return this.closeCamera();
    });
  }
}
