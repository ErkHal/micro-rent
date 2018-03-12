import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MediaService } from "../../services/media.service";
import { EmailComposer } from "@ionic-native/email-composer";
import { User } from "../../models/user";

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
    private mediaService: MediaService,
    private emailComposer: EmailComposer,
    public alertCtrl: AlertController) {
  }

  ngOnInit() {
    console.log(this.navParams.get('id'));

    //Retrieve all listing information using the id
    this.mediaService.getSingleListing(this.navParams.get('id'))
      .subscribe(result => {
        console.log(result);
        this.listingInfo = result;


        try {
          if (result['user_id'] == this.mediaService.userInfo.user_id) {

            this.mediaService.myListing = true;

          } else {
            console.log('not my listing')
            this.mediaService.myListing = false;
          }
        } catch (err) {

          this.mediaService.myListing = false;
        }

        //Get the renter's contact information as well if user is logged in
        console.log('User is logged in: ' + this.mediaService.isLoggedIn)
        if (this.mediaService.isLoggedIn) {
          this.mediaService.getContactInformation(this.listingInfo.user_id)
            .subscribe(result => {
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
  //delete current listing
  deleteListing() {

    this.mediaService.deleteListing(this.listingInfo.file_id)
      .subscribe(result => {
        console.log(result);
        this.navCtrl.pop();
      });
  }
  //confirm deleting
  showAlert() {
    let confirm = this.alertCtrl.create({
      title: 'Delete',
      subTitle: 'Are you sure you want to delete this listing?',
      buttons: [
        {
          text: 'no',
          handler: () => {
            console.log('NO clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteListing();

          }
        }
      ]
    });
    confirm.present();
  }


  /* Opens the default email application in the device
    and passes the email template to it, including
    the lister contact information retrieved from the API,
    and a default message.
  */
  openEmailApp() {

    let emailAddr: string;

    this.mediaService.getContactInformation(
      this.listingInfo.user_id
    ).subscribe((userInfo: User) => {

      emailAddr = userInfo.email;

      let email = {
        to: emailAddr,
        subject: "MicroRent: I want to rent your listing !",
        body: 'Hey ! I am interested in your listing: '
          + this.listingInfo.title + ', lets talk about the details !',
        isHtml: true
      };
      //Open email app
      this.emailComposer.open(email);

    }, err => {
      console.log("Didn't find contact information with id: "
        + this.listingInfo.user_id);
    });
  }
}
