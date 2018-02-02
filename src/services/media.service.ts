import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../models/login-response';
import { User } from "../models/user";
import { RegisterResponse } from "../models/register-response";
import { Storage } from '@ionic/storage';
import { Observable } from "rxjs/Observable";

@Injectable()
export class MediaService {

  isLoggedIn = false;

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

    return this.http.post<LoginResponse>(this.rootAPIUrl + 'login', userCredentials);
  }

  //Returns all listings from the API
  getAllListings() {
    return this.http.get(this.rootAPIUrl + 'media');
  }

  //Validates the token with the API
  getUserInfo(token) {
    console.log("assumed token: " + token);
    const reqSettings = {
      headers: new HttpHeaders().set('x-access-token', token)
    };
    return this.http.get(this.rootAPIUrl + 'users/user', reqSettings)
    }

//Checks if the user has a token in local storage
  userHasToken() {
    return new Promise( (resolve, reject) => {
      this.storage.get('token')
      .then( result => {
        resolve(result);
      }).catch( err => {
        console.log("Error validating token: " + err);
        reject(err);
      })
    });
  }
}
