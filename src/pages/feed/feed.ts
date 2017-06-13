import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AngularFireDatabase } from "angularfire2/database";
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private af: AngularFireDatabase
  ) {
    this.af.list("/snaps", { preserveSnapshot: true }).subscribe(snaps => {
      snaps.forEach(snap => {
        this.snaps.push(snap.val());
      });
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad Feed");
  }

  openSnap(snap) {
    this.picture = snap.dataPicture;
    this.showSnap = true;
    this.displaySnapTimeout();
  }

  displaySnapTimeout() {
    setTimeout(() => {
      this.showSnap = false;
    }, this.TIME_IN_MS);
  }
}
