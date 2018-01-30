import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../models/login-response';
import { HomePage } from "../pages/home/home";
import { Storage } from '@ionic/storage';
import { MyApp } from '../app/app.component';

@Injectable()
export class MediaService {

  rootAPIUrl = 'http://media.mw.metropolia.fi/wbma/';

  constructor(private http: HttpClient,
              private storage: Storage) { }

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

      this.storage.set('token', loginResponse.token);

      //this.navCtrl.push(HomePage);

    }, err => {
      console.log('Something went very wrong. Heres why: ' + err.message);
    });
  }

  getAllListings() {
    return this.http.get(this.rootAPIUrl + 'media');
  }
}
