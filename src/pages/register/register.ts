import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';

import { RequestService } from '../../services/request';

@IonicPage() @Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public loader: boolean = true;
  public email: string;
  public password: string;
  public name: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public requestService: RequestService
  ) {
  }
  ionViewDidEnter() {
    this.password = null;
    this.email = null;
    this.name = null;
    this.loader = false;
  }

  register() {
    this.loader = true;
    let requestData = {
      body: {
        'name': this.name,
        'email': this.email,
        'password': this.password
      }
    };
    this.requestService.authMethod('/other/new', requestData).subscribe(data => {
      console.log('Zarejestrowano', data)
      if (data.error === false) {
        this.goBack();
      } else {
        
      }
      this.loader = false;
    });
  }

  goBack() {
    this.navCtrl.setRoot(LoginPage);
  }

}
