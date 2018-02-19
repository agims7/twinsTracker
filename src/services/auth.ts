import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { RequestService } from './request';

@Injectable()
export class AuthService {
  public premium: boolean;
  public userName: string;
  public userToken: string;
  public userEmail: string;
  public userPassword: string;
  public userID: number;

  constructor(
    public storage: Storage,
    public requestService: RequestService
  ) { }

  clear(): void {
    this.premium = false;
    this.userName = null;
    this.userToken = null;
    this.userEmail = null;
    this.userPassword = null;
    this.userID = null;
  }

  setKeys(premium, name, token, email, id): void {
    this.storage.ready().then(() => {
      this.premium = premium;
      this.userName = name;
      this.userToken = token;
      this.userEmail = email;
      this.userID = id;
      this.storage.set('premium', this.premium);
      this.storage.set('userName', this.userName);
      this.storage.set('userToken', this.userToken);
      this.storage.set('userEmail', this.userEmail);
      this.storage.set('userID', this.userID);
    });
  }

  getKeys(): any {
    let userData = {
      "premium": '',
      "name": '',
      "token": '',
      "email": '',
      "ID": ''
    };
    this.storage.get('premium').then((premium) => {
      userData.premium = premium;
    });
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
    return userData;
  }

}