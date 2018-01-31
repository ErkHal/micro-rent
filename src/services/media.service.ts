import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../models/login-response';
import { HomePage } from "../pages/home/home";
import { Storage } from '@ionic/storage';
import { MyApp } from '../app/app.component';
import { User } from "../models/user";
import { RegisterResponse } from "../models/register-response";

@Injectable()
export class MediaService {

  rootAPIUrl = 'http://media.mw.metropolia.fi/wbma/';

  constructor(private http: HttpClient,
              private storage: Storage) { }

  //Register a new user
  register(newUser: User) {

    this.http.post(this.rootAPIUrl + 'users', newUser)
      .subscribe( (response: RegisterResponse) => {
        //Login user after registering
        this.login(newUser);

        return response;
      }, err => {
        console.log("Couldn't register user; " + err);
        return err;
      });
  }

  //Login user
  login(userCredentials: User) {

    this.http.post<LoginResponse>(this.rootAPIUrl + 'login', userCredentials)
    .subscribe( loginResponse => {

      console.log('All good in the hood');

      this.storage.set('token', loginResponse.token);

    }, err => {
      console.log('Something went very wrong. Heres why: ' + err.message);
    });
  }

  //Returns all listings from the API
  getAllListings() {
    return this.http.get(this.rootAPIUrl + 'media');
  }

  //Validates the token with the API
  hasValidToken() {

    const reqSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };

    return this.http.get(this.rootAPIUrl + 'users/user', reqSettings);
  }
}
