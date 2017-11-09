import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NgForm } from '@angular/forms';

import { RegisterPage } from "../register/register";
import { ReminderPage } from "../reminder/reminder";
import { HomePage } from "../home/home";

import { AuthService } from '../../services/auth';
import { RequestService } from '../../services/request';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  registerPage = RegisterPage;
  reminderPage = ReminderPage;
  public wrongPassword: boolean = false;
  public wrongEmail: boolean = false;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService,
    public requestService: RequestService
  ) {
  }

  ionViewDidEnter() {
    this.authService.getKeys();
  }


  loginUser() {
    let requestData = {
      body: {
        'email': this.authService.userEmail,
        'password': this.authService.userPassword
      }
    }
    console.log('przed zapytanie http')
    this.requestService.postLogin('/auth', requestData).subscribe(data => {
      console.log('zapytanie post', data)
      if (data.error === false) {
        console.log(data.error, 'error false')
        this.authService.userToken = data.token;
        this.authService.userID = data.user.id;
        this.authService.setKeys(data.token, data.email, data.user.id);
        this.navCtrl.setRoot(HomePage);
      } else {
        console.log(data.error, 'error true')
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
