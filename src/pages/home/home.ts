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

  searchBarVisible = false;

  constructor(public navCtrl: NavController, private mediaService: MediaService) {

  }

  ionViewWillEnter() {

    this.loadContent();

    //Displays splash screen unless it's already displayed once.
    if(sessionStorage.getItem('splashDisplayed') != 'true') {
      setTimeout(() => this.splash = false, 2000);
      sessionStorage.setItem('splashDisplayed', 'true');
    } else {
      this.splash = false;
    }
  }

  toggleSearchBar() {
    this.searchBarVisible = !this.searchBarVisible;
  }

  onInput(event) {
    console.log(event);

    this.mediaService.searchListings(event.data)
      .subscribe((response: Listing[]) =>{
        console.log(response);
        this.listings = response;
      });
  }

  //Fetches newest content from API
  loadContent(refresher?: any) {
    this.mediaService.getAllListings()
    .subscribe( (listingsArr: Listing[]) => {

      //Reverse results because result is from oldest no newest for some reason
      this.listings = listingsArr.reverse();

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
