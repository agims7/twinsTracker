import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestService } from "../../services/request";

@IonicPage()
@Component({
  selector: 'page-reminder',
  templateUrl: 'reminder.html',
})
export class ReminderPage {
  public loader: boolean = true;
  public userEmail: string = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public requestService: RequestService,    
  ) {
  }

  ionViewDidEnter() {
    this.loader = false;
  }

  remind() {
    this.loader = true;
    let requestData = {
      token: {},
      body: {
        'email': this.userEmail
      }
    }
    this.requestService.postMethod('/other/reset' , requestData).subscribe(data => {
        console.log(data);
        this.loader = false;
    });
  }

}
