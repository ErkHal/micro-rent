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

    if(sessionStorage.getItem('splashDisplayed') != 'true') {
      setTimeout(() => this.splash = false, 3000);
      sessionStorage.setItem('splashDisplayed', 'true');
    } else {
      this.splash = false;
    }
  }

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

  refreshHome(refresher) {
    this.loadContent(refresher);
  }
}
