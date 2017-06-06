import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Feed');
    }

}
