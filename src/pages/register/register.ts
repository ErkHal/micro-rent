import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaService } from "../../services/media.service";
import { User } from "../../models/user";
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  themeColor: string;
  ermsg: string;

  register: User = {
    username: '',
    password: '',
    email: '',
    full_name: '',

  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public mediaService: MediaService,
    private storage: Storage) { }

  isAvailable(user: string) {



    this.mediaService.checkUserName(user).subscribe(response => {

      let available = response["available"];


      console.log(available);

      if (available == true) {

        this.ermsg = 'username is available';
        this.themeColor = 'primary';

      } else {
        this.ermsg = 'username is already exist';
        this.themeColor = 'danger';
      }
    });
}

  tryRegister(register: User) {

    this.mediaService.login(register).subscribe(response => {

      console.log('registered');
      this.navCtrl.setRoot(HomePage);


    }, err => {
      console.log('error');

    });
  }

  goBack() {
    this.navCtrl.setRoot(HomePage);
  }

}
