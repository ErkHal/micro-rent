import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaService } from "../../services/media.service";

/**
 * Generated class for the MyListingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-listings',
  templateUrl: 'my-listings.html',
})
export class MyListingsPage {

  userListings: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaService: MediaService) {
  }

  ionViewDidLoad() {
    this.mediaService.getUserListings(this.mediaService.userInfo.user_id)
      .subscribe( result => {
        console.log('got listings !');
        console.log(result)
        this.userListings = result;
      }, err => {
        console.log(err);
        this.userListings = [];
      })
  }

}
