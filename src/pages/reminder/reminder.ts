import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-reminder',
  templateUrl: 'reminder.html',
})
export class ReminderPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }


}
