import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RequestService } from '../../services/request';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public requestService: RequestService
  ) {
  }

  register() {
    let body = {
      'email': 'test@fdsfsdfs',
      'password': 123
    };
    this.requestService.postMethod('/users', body).subscribe(data => {
      console.log(data)
    });
  }

}
