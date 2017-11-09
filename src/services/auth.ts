import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { HomePage } from "../pages//home/home";

import { RequestService } from './request';

@Injectable()
export class AuthService {
  public userToken: string;
  public userEmail: string;
  public userPassword: string;
  public userID: number;

  constructor(
    public storage: Storage,
    public requestService: RequestService
  ) { }

  // login() {
  //   let body = {
  //     'email': this.userEmail,
  //     'password': this.userPassword
  //   };
  //   this.requestService.postMethod('/auth', body).subscribe(data => {
  //     console.log(data)
  //     if (data.error === false) {
  //       this.userToken = data.token;
  //       this.userID = data.user.id;
  //       this.setKeys(data.token, data.email, data.user.id)
  //     }
  //   });
  // }

  clear() {
    this.userToken = null;
    this.userEmail = null;
    this.userPassword = null;
    this.userID = null;
    console.log('clear storage data')
  }

  setKeys(token, email, id) {
    this.storage.ready().then(() => {
      this.userToken = token;
      this.userEmail = email;
      this.userID = id;
      this.storage.set('userToken', this.userToken);
      this.storage.set('userEmail', this.userEmail);
      this.storage.set('userID', this.userID);
      console.log('Ustawiono storage keys')      
    });
  }

  getKeys() {
    let userData = {
      "token": '',
      "email": '',
      "ID": ''
    };
      this.storage.get('userToken').then((userToken) => {
        userData.token = userToken;
      });
      this.storage.get('userEmail').then((userEmail) => {
        userData.email = userEmail;
      });
      this.storage.get('userID').then((userID) => {
        userData.ID = userID;
      });
      console.log(userData);
      return userData;
  }
  
}