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

  userInfo: User;

  rootUrl = 'http://media.mw.metropolia.fi/wbma/';

  constructor(private http: HttpClient,
              private storage: Storage) { }

  //Register a new user
  register(newUser: User) {

    this.http.post(this.rootUrl + 'users', newUser)
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

    return this.http.post<LoginResponse>(this.rootUrl + 'login', userCredentials);
  }

  //Returns all listings from the API
  getAllListings() {
    return this.http.get(this.rootUrl + 'media');
  }

  getUserListings(id: number) {
    console.log('Fetching listings of user with id: ' + id)
    return this.http.get(this.rootUrl + 'media/user/' + id);
  }

  //Logout user
  logout() {
    console.log('logging out...');
    localStorage.removeItem('token');
}

  //Validates the token with the API
  getUserInfo(token) {

    const reqSettings = {
      headers: new HttpHeaders().set('x-access-token', token)
    };
    return this.http.get(this.rootUrl + 'users/user', reqSettings)
    }

//Checks if the user has a token in local storage
  userHasToken() {
    return localStorage.getItem('token');
  }
}
