import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../models/login-response';
//import { NavController } from 'ionic-angular';
import { HomePage } from "../pages/home/home";

@Injectable()
export class MediaService {

  rootAPIUrl = 'http://media.mw.metropolia.fi/wbma/';

  constructor(private http: HttpClient, /*private navCtrl: NavController*/) { }

  register() {

  }

  login(username: string, password: string) {
    console.log("usrname: " + username);
    console.log("passwd: " + password);

    const requestBody = {
      username: username,
      password: password
    };

    this.http.post<LoginResponse>(this.rootAPIUrl + 'login', requestBody)
    .subscribe( loginResponse => {

      console.log('All good in the hood');

      localStorage.setItem('token', loginResponse.token);

      //this.navCtrl.push(HomePage);

    }, err => {
      console.log('Something went very wrong. Heres why: ' + err.message);
    });
  }

  getAllListings() {
    return this.http.get(this.rootAPIUrl + 'media');
  }
}
