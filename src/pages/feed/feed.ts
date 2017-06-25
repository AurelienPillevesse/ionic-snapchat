import { PictureServiceProvider } from "../../providers/picture-service/picture-service";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Component } from "@angular/core";
import { Picture } from "../../model/picture";

/**
 * The feed component
 *
 * Display all snaps.
 */
@IonicPage()
@Component({
  selector: "page-feed",
  templateUrl: "feed.html"
})
export class Feed {
  /**
    * Array of snaps
    */
  public snaps: Array<Picture> = [];

  /**
    * Showing a snap
    */
  showSnap = false;

  /**
    * Picture which is displaying
    */
  picture = null;

  /**
    * Time of displaying a snap
    */
  TIME_IN_MS: number = 10000;

  /**
    * Timeout variable of displaying a snap
    */
  timeoutDisplaySnap = null;

  /**
    * Constructor of Feed
    */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pictureServiceProvider: PictureServiceProvider
  ) {
    pictureServiceProvider.getAllSnap(this.snaps);
  }

  /**
    * Open a snap
    */
  openSnap(snap) {
    this.picture = snap.dataPicture;
    this.showSnap = true;
    this.displaySnapTimeout();
  }

  /**
    * Display a snap with a timer
    */
  displaySnapTimeout() {
    this.timeoutDisplaySnap = setTimeout(() => {
      this.showSnap = false;
    }, this.TIME_IN_MS);
  }

  /**
    * Click on picture to close it before the timer is over
    */
  clickOnSnapToClose() {
    this.showSnap = false;
    clearTimeout(this.timeoutDisplaySnap);
  }
}
