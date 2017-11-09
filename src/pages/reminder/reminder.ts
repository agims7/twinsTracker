import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage() @Component({
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
