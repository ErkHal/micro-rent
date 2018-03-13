import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MediaService } from "../../services/media.service";
import { Listing } from "../../models/listing";
import { UploadPage } from "../upload/upload";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  listings: Listing[];

  splash = true;

  searchBarVisible = false;

  @ViewChild('search') searchBar;

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

  //Toggle visibility of search bar
  toggleSearchBar() {
    this.searchBarVisible = !this.searchBarVisible;

    if(!this.searchBarVisible) {
      this.loadContent();
    } else {
      console.log(this.searchBar);
      setTimeout(() => {
      this.searchBar.setFocus();
    },150);
    }
  }

  //Retrieve listings from API and filter them based on given parameters
  onInput(event) {
    //console.log(event);

    this.mediaService.getAllListings()
      .subscribe((response: Listing[]) =>{
        //console.log(response);

        if(event.data === null || event.data === undefined) {
          this.loadContent();
        } else {
        /*
          Matches every listing's title OR description
          that has the given search word in it.
        */
        this.listings = response.filter((listing: Listing) => {

          if(listing.title.toLowerCase().search(event.data.toLowerCase()) != -1 ||
             listing.description.toLowerCase().search(event.data.toLowerCase()) != -1) {

          return listing;
          }
        }).reverse();
      }
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
        setTimeout(() => {
        refresher.complete();
      }, 1000);
      }
    });
  }

  toUploadPage(){
    this.navCtrl.push(UploadPage);
  }
}
