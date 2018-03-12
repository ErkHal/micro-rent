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
  usernameMessage: string;

  usernameAvailable = true;

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

      this.usernameAvailable = response["available"];


      //console.log(this.usernameAvailable);

      if (this.usernameAvailable == true) {

        this.usernameMessage = 'Username is available';
        this.themeColor = 'primary';

      } else {

        this.usernameMessage = 'Username already exists';
        this.themeColor = 'danger';
      }
    });
}

  tryRegister(register: User) {

    this.mediaService.login(register).subscribe(response => {

      //console.log('registered');
      this.navCtrl.setRoot(HomePage);


    }, err => {
      console.log(err);

    });
  }

  goBack() {
    this.navCtrl.setRoot(HomePage);
  }

}
