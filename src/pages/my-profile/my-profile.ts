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

  editingDisabled = true;

  loading = false;
  updated = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaService: MediaService,
              private storage: Storage) {
  }

  ngOnInit() {
    }

    toggleEditing() {
      this.editingDisabled = false;
    }

    /*
    Updates user information to the database using MediaService
    If the user has not updated password, uses only binded values from
    MediaService.userInfo
    */
    updateInfo(userInfoForm) {

      this.loading = true;

      if(userInfoForm.password) {

        this.mediaService.updateUserInformation(userInfoForm.password)
          .subscribe(response => {
            console.log(response);

            this.showConfirmation();
          });

      } else {

        this.mediaService.updateUserInformation()
          .subscribe(response => {
            console.log(response);

            this.showConfirmation();
          });
      }
    }

    /*
      Switches visible icons from 'loading' to
      'checkmark' that is visible for 2 seconds
    */
    showConfirmation() {
      this.loading = false;
      this.updated = true;
      this.editingDisabled = true;

      //Show confirmation icon
      setTimeout(() => {
      this.updated = false;
      }, 2000);
    }
  }
