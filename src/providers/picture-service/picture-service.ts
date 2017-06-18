import { CameraPreview, CameraPreviewOptions } from "@ionic-native/camera-preview";
import { LoadingController, Loading, ToastController } from "ionic-angular";
import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { User } from "../../model/user";
import * as firebase from "firebase/app";

/**
* Picture service
*/
@Injectable()
export class PictureServiceProvider {
  /**
  * Base64 picture
  */
  public picture: String;

  /**
  * Boolean for the display of user menu
  */
  public displayUserMenu: Boolean;

  /**
  * Boolean to know if user just took a snap
  */
  public tookSnap: Boolean;

  /**
  * Instance of loading for loading spinner
  */
  public loading: Loading;

  /**
  * List of snaps
  */
  public snaps: any;

  /**
  * Constructor of PictureServiceProvider
  */
  constructor(
    public loadingCtrl: LoadingController,
    private cameraPreview: CameraPreview,
    private toastCtrl: ToastController,
    private af: AngularFireDatabase,
    private storage: Storage
  ) {}

  /**
  * Initialize all variables and get reference of the list of snaps
  */
  initialize() {
    this.displayUserMenu = false;
    this.tookSnap = false;
    this.snaps = this.af.list("/snaps");
  }

  /**
  * Get all snaps fo all users
  */
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

  /**
  * Start the camera
  */
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

  /**
  * Close the camera
  */
  closeCamera() {
    this.cameraPreview.stopCamera();
  }

  /**
  * Switch the camera
  */
  switchCamera() {
    this.cameraPreview.switchCamera();
  }

  /**
  * Take a picture
  */
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

  /**
  * Close display when the user took a snap
  */
  closeTookSnap() {
    this.tookSnap = false;
    this.startCamera();
  }

  /**
  * Open the user menu
  */
  clickUserMenu() {
    this.displayUserMenu = true;
  }

  /**
  * Close the user menu
  */
  closeUserMenu() {
    this.displayUserMenu = false;
  }

  /**
  * Send a picture
  */
  sendPicture(user: User) {
    this.uploadPicture(user, 10);
    this.tookSnap = false;
  }

  /**
  * Upload a picture
  */
  uploadPicture(user: User, duration: number) {
    this.snaps.push({
      from: user.login,
      dataPicture: this.picture,
      duration: duration
    });
    this.updateUserScore(user);
    this.showToast("Successfully send the snap!");
  }

  /**
  * Update the score of a user
  */
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

  /*
  * Show a toast message
  */
  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: "middle"
    });

    toast.present();
  }
}
