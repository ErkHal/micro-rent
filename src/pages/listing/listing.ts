import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaService } from "../../services/media.service";

@IonicPage()
@Component({
  selector: 'page-listing',
  templateUrl: 'listing.html',
})
export class ListingPage {

  listingInfo: any;

  userInfo: any;

  uploadsUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mediaService: MediaService) {
  }

  ngOnInit() {
    console.log(this.navParams.get('id'));

    //Retrieve all listing information using the id
    this.mediaService.getSingleListing(this.navParams.get('id'))
      .subscribe( result => {
        console.log(result);
        this.listingInfo = result;

        //Get the renter's contact information as well if user is logged in
        console.log('User is logged in: ' + this.mediaService.isLoggedIn)
        if(this.mediaService.isLoggedIn) {
          this.mediaService.getContactInformation(this.listingInfo.user_id)
            .subscribe( result => {
              this.userInfo = result;
            }, err => {
              console.log('you fucked something up young padawan');
              console.log(err)
            });
        }

      }, err => {
        console.log('you fucked something up young padawan');
        console.log(err)
      })
  }

  openEmailApp() {
    console.log(this.userInfo.email);
  }
}
