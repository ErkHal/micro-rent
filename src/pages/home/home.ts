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

  splash = true;

  constructor(public navCtrl: NavController, private mediaService: MediaService) {

  }

  ngOnInit() {

    this.loadContent();

    //Displays splash screen unless it's already displayed once.
    if(sessionStorage.getItem('splashDisplayed') != 'true') {
      setTimeout(() => this.splash = false, 4000);
      sessionStorage.setItem('splashDisplayed', 'true');
    } else {
      this.splash = false;
    }
  }

  //Fetches newest content from API
  loadContent(refresher?: any) {
    this.mediaService.getAllListings()
    .subscribe( (listingsArr: Listing[]) => {
      this.listings = listingsArr;

      //If called from refresh, complete async operation
      if(refresher) {
        console.log('refresh');
        refresher.complete();
      }
    });
  }

  //Fired when user swipes down to refresh home page
  refreshHome(refresher) {
    this.loadContent(refresher);
  }
}
