import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { MyProfilePage } from "../pages/my-profile/my-profile";
import { MyListingsPage } from "../pages/my-listings/my-listings";
import { LoginPage } from "../pages/login/login";
import { MediaService } from "../services/media.service";
import { LogoutPage } from "../pages/logout/logout";
import { User } from "../models/user";
import { ListingPage } from "../pages/listing/listing";
import { RegisterPage } from "../pages/register/register";
import { UploadPage } from "../pages/upload/upload";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  homePage: any;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public storage: Storage,
              public mediaService: MediaService) {

    this.initializeApp();

    this.homePage = { title: 'Home', component: HomePage }

    this.pages = [
      { title: 'Login', component: LoginPage },
      { title: "My Profile", component: MyProfilePage },
      { title: "My Listings", component: MyListingsPage },
      { title: "Logout", component: LogoutPage },
      { title: "Register", component: RegisterPage},
      { title: "New Listing", component: UploadPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      //this.splashScreen.hide();

      this.mediaService.getUserInfo(this.mediaService.userHasToken())
        .subscribe((response: User) => {
          console.log(response)
          this.mediaService.userInfo = response;
          this.mediaService.isLoggedIn = true;
        }, err => {
          this.mediaService.isLoggedIn = false;
        })
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  openListing(id: string) {
    this.nav.push(ListingPage, {
      mediaParams: id
    });
  }
}
