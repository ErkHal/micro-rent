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

  constructor(public navCtrl: NavController, private mediaService: MediaService) {

  }

  ngOnInit() {
    this.mediaService.getAllListings()
    .subscribe( (listingsArr: Listing[]) => {
      this.listings = listingsArr;
      
    });
  }
}
