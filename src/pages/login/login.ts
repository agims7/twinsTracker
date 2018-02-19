import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NgForm } from '@angular/forms';

import { RegisterPage } from "../register/register";
import { ReminderPage } from "../reminder/reminder";
import { HomePage } from "../home/home";

import { AuthService } from '../../services/auth';
import { RequestService } from '../../services/request';
import { AppService } from '../../services/app';

import { Subscription } from 'rxjs/Subscription';

@IonicPage() @Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  registerPage = RegisterPage;
  reminderPage = ReminderPage;
  public wrongPassword: boolean = false;
  public wrongEmail: boolean = false;

  public subscriptionOne: Subscription;
  
  constructor(
    private appService: AppService,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService,
    public requestService: RequestService
  ) {
  }

  ionViewDidLeave() {
    this.appService.safeUnsubscribe(this.subscriptionOne);
  }

  ionViewDidEnter() {
    this.authService.getKeys();
  }

  loginUser() {
    const requestData = {
      body: {
        'email': this.authService.userEmail,
        'password': this.authService.userPassword
      }
    }
    this.subscriptionOne = this.requestService.authMethod('/other/auth', requestData).subscribe(data => {
      if (!data.error) {
        this.authService.premium = data.user.premium;
        this.authService.userName = data.user.name;
        this.authService.userToken = data.token;
        this.authService.userID = data.user.id;
        this.authService.userEmail = data.user.email;
        this.authService.setKeys(data.user.premium, data.user.name, data.token, data.user.email, data.user.id);
        this.navCtrl.setRoot(HomePage);
      } else {
        if (data.code === 2) {
          this.wrongPassword = true;
          this.wrongEmail = false;
        } else if (data.code === 1) {
          this.wrongEmail = true;
          this.wrongPassword = false;
        }
      }
    });
  }
}
