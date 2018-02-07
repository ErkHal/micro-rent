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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaService: MediaService,
              private storage: Storage) {
  }

  ngOnInit() {

    //Check if user has a token, after that verifies token with the API
    const userToken = this.mediaService.userHasToken();
      if(userToken) {
        console.log('@my-profile: User has token: ' + userToken);
        this.mediaService.getUserInfo(userToken)
          .subscribe( (result: User) => {
            console.log(result);
            this.mediaService.userInfo = result;
        });
      }
    }
  }
