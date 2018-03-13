import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaService } from "../../services/media.service";
import {UploadPage} from '../upload/upload';

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

  userListings: any = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaService: MediaService) {
  }

  ionViewWillEnter() {
    this.refreshPage();
  }

  refreshPage(refresher?)  {
    this.mediaService.getUserListings(this.mediaService.userInfo.user_id)
      .subscribe( result => {
        //console.log('got listings !');
        if(result['length'] >= 1) {
          this.userListings = result;
        } else {
          this.userListings = null;
        }
      }, err => {
        console.log(err);
        this.userListings = null;
      });

      if(refresher) {
        setTimeout(() => {
        refresher.complete();
      }, 1000);
      }
  }

  toUploadPage(){
    this.navCtrl.push(UploadPage);
  }
}
