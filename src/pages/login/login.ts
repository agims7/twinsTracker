import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RegisterPage } from "../register/register";
import { ReminderPage } from "../reminder/reminder";

import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  registerPage = RegisterPage;
  reminderPage = ReminderPage;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService
  ) {
  }

  // ionViewWillEnter() {
  //   this.authService.setKeys();
  // }
  
  ionViewDidEnter() {
    this.authService.getKeys();
  }
}
