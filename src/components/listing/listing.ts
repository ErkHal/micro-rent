import { Component, Input } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { ListingPage } from "../../pages/listing/listing";

/**
 * Generated class for the ListingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-listing',
  templateUrl: 'listing.html'
})
export class ListingComponent {

@Input()
  listing: any;

  mediaUrl = "http://media.mw.metropolia.fi/wbma/uploads/";

  constructor(public navCtrl: NavController, public params: NavParams) {
  }

  openListing(id: string) {
    this.navCtrl.push(ListingPage, {
      id: id
    });
  }

}
