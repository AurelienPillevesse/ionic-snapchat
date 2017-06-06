import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
* Generated class for the Feed page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
    selector: 'page-feed',
    templateUrl: 'feed.html',
})
export class Feed {
    snaps = [{
        from: "Pipic1"
    }, {
        from: "Pipic2"
    }];

    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Feed');
    }

    ionViewWillEnter() {
        this.storage.get('user').then(() => {
            this.navCtrl.push('snap');
        });
    }
}
