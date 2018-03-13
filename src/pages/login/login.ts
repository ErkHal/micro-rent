import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { MediaService } from "../../services/media.service";
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import {RegisterPage} from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  displayError = false;

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

    this.displayError = false;

    this.mediaService.login(credentials)
      .subscribe( loginResponse => {

        //console.log('User logged in');
        localStorage.setItem('token', loginResponse.token);
        this.navCtrl.setRoot(HomePage);
        this.mediaService.isLoggedIn = true;

        const userData: User = loginResponse['user'];
        this.mediaService.userInfo = userData;
      }, err => {
        this.displayError = true;
    });
  }

  toRegister(){
    this.navCtrl.push(RegisterPage);
  }
}
