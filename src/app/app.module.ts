import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyProfilePage } from "../pages/my-profile/my-profile";
import { MyListingsPage } from "../pages/my-listings/my-listings";
import { MediaService } from "../services/media.service";
import { HttpClientModule } from "@angular/common/http";
import { LoginPage } from "../pages/login/login";
import { LogoutPage } from "../pages/logout/logout";
import { PipesModule } from "../pipes/pipes.module";
import { ListingPage } from "../pages/listing/listing";
import { ComponentsModule } from "../components/components.module";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MyProfilePage,
    MyListingsPage,
    LoginPage,
    LogoutPage,
    ListingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    PipesModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MyProfilePage,
    MyListingsPage,
    LoginPage,
    LogoutPage,
    ListingPage
  ],
  providers: [
    HttpClientModule,
    StatusBar,
    SplashScreen,
    MediaService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
