import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, Loading } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AngularFireDatabase } from "angularfire2/database";
import {LoadingModal} from './components/loading-modal/loading-modal';

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
  //public loading: Loading;

  //public loadingCtrl: LoadingController
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
      //this.loading.dismiss();
    });

    //this.loading = this.loadingCtrl.create();
    //this.loading.present();
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
    this.timeoutDisplaySnap = setTimeout(() => {
      this.showSnap = false;
    }, this.TIME_IN_MS);
  }

<<<<<<< HEAD

=======
  clickOnSnapToClose() {
    this.showSnap = false;
    clearTimeout(this.timeoutDisplaySnap);
  }
>>>>>>> 1b0407648ffc4d230e738e7f8cafcc9a68de9c98
}
