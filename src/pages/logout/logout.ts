import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaService } from "../../services/media.service";
import { HomePage } from "../home/home";

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mediaService: MediaService) {
  }

  ionViewDidLoad() {
    this.mediaService.logout();
    this.mediaService.isLoggedIn = false;
    this.navCtrl.setRoot(HomePage);
  }

}
