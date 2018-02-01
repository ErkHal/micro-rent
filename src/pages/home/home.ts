import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MediaService } from "../../services/media.service";
import { Listing } from "../../models/listing";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  listings: Listing[];

  mediaUrl = "http://media.mw.metropolia.fi/wbma/uploads/";

  constructor(public navCtrl: NavController, private mediaService: MediaService) {

  }

  ngOnInit() {
    this.mediaService.getAllListings()
    .subscribe( (listingsArr: Listing[]) => {
      this.listings = listingsArr;

      this.listings.forEach( listing => {
        const oldUrl = listing.filename.split('.');
        const newUrl = oldUrl[0] + '-tn320.png';

        listing["thumbnail"] = newUrl;

      });
    });

    console.log("Home user has token: " + this.mediaService.userHasToken())
    /*this.mediaService.userHasTokenAsync()
      .then( response => {
        console.log(response);
      }).catch( err => {
        console.log(err);
      }); */

  }
}
