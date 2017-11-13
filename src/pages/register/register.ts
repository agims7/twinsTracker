import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';

import { RequestService } from '../../services/request';

@IonicPage() @Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public email: string;
  public password: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public requestService: RequestService
  ) {
  }
  ionViewDidEnter() {
    this.password = null;
    this.email = null;
  }

  register() {
    let requestData = {
      body: {
        'email': this.email,
        'password': this.password
      }
    };
    console.log(requestData)
    this.requestService.postRegister('/other/new', requestData).subscribe(data => {
      console.log('Zarejestrowano', data)
      if (data.error === false) {
        this.goBack();
      } else {
        
      }
    });
  }

  goBack() {
    this.navCtrl.setRoot(LoginPage);
  }

}
