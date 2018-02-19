import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestService } from "../../services/request";
import { AppService } from '../../services/app';

import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-reminder',
  templateUrl: 'reminder.html',
})
export class ReminderPage {
  public loader: boolean = true;
  public userEmail: string = null;

  public subscriptionOne: Subscription;

  constructor(
    private appService: AppService,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public requestService: RequestService,    
  ) {
  }

  ionViewDidLeave() {
    this.appService.safeUnsubscribe(this.subscriptionOne);
  }

  ionViewDidEnter() {
    this.loader = false;
  }

  remind() {
    this.loader = true;
    const requestData = {
      token: {},
      body: {
        'email': this.userEmail
      }
    }
    this.subscriptionOne = this.requestService.postMethod('/other/reset' , requestData).subscribe(data => {
        console.log(data);
        this.loader = false;
    });
  }

}
