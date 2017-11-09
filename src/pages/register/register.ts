import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RequestService } from '../../services/request';


@Component({
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
    let body = {
      'email': this.email,
      'password': this.password
    };
    this.requestService.postMethod('/users', body).subscribe(data => {
      console.log(data)
    });
  }

}
