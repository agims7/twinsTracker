import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';

import { RequestService } from '../../services/request';
import { AppService } from '../../services/app';

import { Subscription } from 'rxjs/Subscription';

@IonicPage() @Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public loader: boolean = true;
  public email: string;
  public password: string;
  public name: string;

  public subscriptionOne: Subscription;

  constructor(
    private appService: AppService,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public requestService: RequestService
  ) {
  }

  ionViewDidLeave() {
    this.appService.safeUnsubscribe(this.subscriptionOne);
  }

  ionViewDidEnter() {
    this.password = null;
    this.email = null;
    this.name = null;
    this.loader = false;
  }

  register() {
    this.loader = true;
    const requestData = {
      body: {
        'name': this.name,
        'email': this.email,
        'password': this.password
      }
    };
    this.subscriptionOne = this.requestService.authMethod('/other/new', requestData).subscribe(data => {
      console.log('Zarejestrowano', data)
      if (!data.error) {
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
