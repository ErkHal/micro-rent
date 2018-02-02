import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { MediaService } from "../../services/media.service";
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userCredentials: User = {
    username: '',
    password: '',
    email: '',
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaService: MediaService,
              private storage: Storage) { }

  tryLogin(credentials: User) {

    this.mediaService.login(credentials)
      .subscribe( loginResponse => {

        console.log('User logged in');
        this.storage.set('token', loginResponse.token);
        this.navCtrl.setRoot(HomePage);
        this.mediaService.isLoggedIn = true;

      }, err => {
        console.log('Something went very wrong. Heres why: ' + err.message);
    });
  }
}
