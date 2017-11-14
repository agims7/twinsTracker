import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { HomePage } from "../pages//home/home";

import { RequestService } from './request';

@Injectable()
export class AuthService {
  public userName: string;
  public userToken: string;
  public userEmail: string;
  public userPassword: string;
  public userID: number;

  constructor(
    public storage: Storage,
    public requestService: RequestService
  ) { }

  clear() {
    this.userName = null;
    this.userToken = null;
    this.userEmail = null;
    this.userPassword = null;
    this.userID = null;
  }

  setKeys(name, token, email, id) {
    console.log(name, token, email, id)
    this.storage.ready().then(() => {
      this.userName = name;
      this.userToken = token;
      this.userEmail = email;
      this.userID = id;
      this.storage.set('userName', this.userName);
      this.storage.set('userToken', this.userToken);
      this.storage.set('userEmail', this.userEmail);
      this.storage.set('userID', this.userID);
      console.log('ustawiono')
    });
  }

  getKeys() {
    let userData = {
      "name": '',
      "token": '',
      "email": '',
      "ID": ''
    };
    this.storage.get('userName').then((userName) => {
      userData.name = userName;
    });
    this.storage.get('userToken').then((userToken) => {
      userData.token = userToken;
    });
    this.storage.get('userEmail').then((userEmail) => {
      userData.email = userEmail;
    });
    this.storage.get('userID').then((userID) => {
      userData.ID = userID;
    });
    console.log(userData)
    return userData;
  }
  
}