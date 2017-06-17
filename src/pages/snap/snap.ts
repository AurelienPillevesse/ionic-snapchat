import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
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
  /**
    * Feed variable to redirect to Feed with LazyLoading page string
    */
  public feed: String = "Feed";

  /**
    * Current user
    */
  public user: User;

  /**
    * Constructor of Snap
    */
  constructor(
    private firebaseServiceProvider: FirebaseServiceProvider,
    private pictureServiceProvider: PictureServiceProvider,
    public authData: AuthProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage
  ) {
    this.pictureServiceProvider.initialize();
  }

  /**
    * initialization of the user on init of the page
    */
  ngOnInit() {
    if (this.user == null) {
      this.storage.get("userUID").then(userUID => {
        this.authData.currentUserInfo(userUID).on("value", data => {
          this.user = new User(data.val().name, data.val().lastname, data.val().login, data.val().score);
        });
      });
    }
  }

  /**
    * Start camera when page is loaded
    */
  ionViewDidLoad() {
    this.pictureServiceProvider.startCamera();
  }

  /**
    * Close the camera
    */
  closeCamera() {
    this.pictureServiceProvider.closeCamera();
  }

  /**
    * Switch the camera
    */
  switchCamera() {
    this.pictureServiceProvider.switchCamera();
  }

  /**
    * Open the user menu
    */
  clickUserMenu() {
    this.pictureServiceProvider.clickUserMenu();
  }

  /**
    * Close the user menu
    */
  closeUserMenu() {
    this.pictureServiceProvider.closeUserMenu();
  }

  /**
    * Remove the user interface when snap is taken
    */
  closeTookSnap() {
    this.pictureServiceProvider.closeTookSnap();
  }

  /**
    * Take a picture
    */
  takePicture() {
    this.pictureServiceProvider.takePicture();
  }

  /**
    * Send a picture
    */
  sendPicture() {
    this.pictureServiceProvider.sendPicture(this.user);
  }

  /**
    * Logout of the application
    */
  logout() {
    this.firebaseServiceProvider
      .logout()
      .then(() => {
        return this.closeCamera();
      })
      .then(() => {
        this.navCtrl.setRoot("HomePage");
      });
  }
}
