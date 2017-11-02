import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthService {
  public userToken: string;
  public userEmail: string;

  constructor(
    public storage: Storage
  ) { }

  setKeys(token, email) {
    this.storage.ready().then(() => {
      this.userToken = token;
      this.userEmail = email;
      this.storage.set('userToken', this.userToken);
      this.storage.set('userEmail', this.userEmail);
      console.log('Ustawiono storage keys')      
    });
    // let user = {
    //   'userToken': "token",
    //   'userEmail': 'jakisemail'
    // }
    // window.localStorage.users_data = JSON.stringify(user);
  }

  getKeys() {
    let userData = {
      "token": '',
      "email": ''
    };
      this.storage.get('userToken').then((userToken) => {
        userData.token = userToken;
      });
      this.storage.get('userEmail').then((userEmail) => {
        userData.email = userEmail;
      });
      console.log(userData);
      return userData;
      // this.storage.keys().then((data) => {
      //   console.log(data, 'data');
      // });
      // console.log(JSON.parse(window.localStorage.users_data || '[]'));
  }
  
}