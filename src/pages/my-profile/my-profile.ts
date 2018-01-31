import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaService } from '../../services/media.service';
import { Storage } from '@ionic/storage';
import { User } from '../../models/user';

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {

  userInfo: User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mediaService: MediaService,
              private storage: Storage) {
  }

  ngOnInit() {

    //Check if user has a token, after that verifies token with the API
      this.mediaService.userHasToken()
        .then( response => {

          console.log('User has token');

          this.mediaService.getUserInfo()
            .subscribe( result => {
              this.userInfo = result;
            });
        }).catch( err => {
          console.log('Error @ my-profile onInit ' + err)
          this.showInfo = err;
        });
    }
  }
