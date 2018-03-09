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

  myListing = false;

  userInfo: User;

  rootUrl = 'http://media.mw.metropolia.fi/wbma/';

  constructor(private http: HttpClient,
    private storage: Storage) { }

  //Check if username is already exist
  checkUserName(userName: string) {

    return this.http.get(this.rootUrl + 'users/username/' + userName);

  }

  //Register a new user
  register(newUser: User) {

    this.http.post(this.rootUrl + 'users', newUser)
      .subscribe((response: RegisterResponse) => {
        //Login user after registering
        this.login(newUser);

        return response;
      }, err => {
        console.log("Couldn't register user; " + err);
        return err;
      });
  }

  //Searches listing's both title AND description for the given searchword
  searchListings(searchword: string) {

    const reqSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };

    const reqBody = {
      title: searchword,
      description: searchword
    }

    return this.http.post(this.rootUrl + 'media/search', reqBody, reqSettings);

  }


  tagPicture(tagi) {

    const reqSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };

    return this.http.post(this.rootUrl + 'tags', tagi, reqSettings);

  }

  //Uploads new media to server
  upload(formData: FormData) {

    const reqSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };

    return this.http.post(this.rootUrl + 'media', formData, reqSettings);
  }

  //Login user
  login(userCredentials: User) {

    return this.http.post<LoginResponse>(this.rootUrl + 'login', userCredentials);
  }

  //Returns all listings from the API
  getAllListings() {
    return this.http.get(this.rootUrl + 'tags/microrent');
  }

  //Get listingsof a single user
  getUserListings(id: number) {
    console.log('Fetching listings of user with id: ' + id)
    return this.http.get(this.rootUrl + 'media/user/' + id);
  }

  //Get a single listing with id
  getSingleListing(file_id: number) {
    console.log('fetching media with id: ' + file_id);
    return this.http.get(this.rootUrl + 'media/' + file_id);
  }

  deleteListing(id) {

    const reqSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };

    return this.http.delete(this.rootUrl + 'media/' + id, reqSettings);
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


  /*
  Updates the user information, updates password if its passed
  as a parameter.
  */
  updateUserInformation(updatedPasswd?) {

    //Get token from Local Storage
    const reqSettings = {
      headers: new HttpHeaders().set(
        'x-access-token', localStorage.getItem('token')
      )
    };

    //Get email and username
    let updatedUserInfo = this.userInfo;

    //Get new password if given
    if (updatedPasswd) {
      updatedUserInfo.password = updatedPasswd;
    }

    return this.http.put(this.rootUrl + 'users', updatedUserInfo, reqSettings);
  }

  //Gets the renter's information with id
  getContactInformation(id: number) {

    const reqSettings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token'))
    };

    return this.http.get(this.rootUrl + 'users/' + id, reqSettings);

  }

  //Checks if the user has a token in local storage
  userHasToken() {
    return localStorage.getItem('token');
  }
}
