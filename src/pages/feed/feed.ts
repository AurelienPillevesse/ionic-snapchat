import { PictureServiceProvider } from "../../providers/picture-service/picture-service";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Component } from "@angular/core";

/**
* Generated class for the Feed page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: "page-feed",
  templateUrl: "feed.html"
})
export class Feed {
  snaps = [];
  showSnap = false;
  picture = null;
  TIME_IN_MS: number = 10000;
  timeoutDisplaySnap = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pictureServiceProvider: PictureServiceProvider
  ) {
    pictureServiceProvider.getAllSnap(this.snaps);
  }

  openSnap(snap) {
    this.picture = snap.dataPicture;
    this.showSnap = true;
    this.displaySnapTimeout();
  }

  displaySnapTimeout() {
    this.timeoutDisplaySnap = setTimeout(() => {
      this.showSnap = false;
    }, this.TIME_IN_MS);
  }

  clickOnSnapToClose() {
    this.showSnap = false;
    clearTimeout(this.timeoutDisplaySnap);
  }
}
