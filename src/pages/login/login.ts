import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { MediaService } from "../../services/media.service";
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

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
        localStorage.setItem('token', loginResponse.token);
        this.navCtrl.setRoot(HomePage);
        this.mediaService.isLoggedIn = true;

        const userData: User = loginResponse['user'];
        this.mediaService.userInfo = userData;
      }, err => {
        console.log('Something went very wrong. Heres why: ' + err.message);
    });
  }
}
