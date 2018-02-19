import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { EditChildPage } from '../../pages/edit-child/edit-child';
import { AddChildPage } from '../../pages/add-child/add-child';
import { ChildrenService } from "../../services/children";
import { RequestService } from "../../services/request";
import { AuthService } from "../../services/auth";
import { TimerService } from "../../services/timer";
import { AppService } from '../../services/app';

import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

@IonicPage() @Component({
  selector: 'page-children',
  templateUrl: 'children.html',
})
export class ChildrenPage {
  public loader: boolean = true;

  public subscriptionOne: Subscription;
  public subscriptionTwo: Subscription;

  constructor(
    private appService: AppService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public childrenService: ChildrenService,
    public requestService: RequestService,
    public authService: AuthService,
    public timerService: TimerService
  ) {
  }

  ionViewDidLeave() {
    this.appService.safeUnsubscribe(this.subscriptionOne);
    this.appService.safeUnsubscribe(this.subscriptionTwo);
  }

  ionViewDidEnter() {
    this.loader = false;
    this.areChildren();
    console.log(this.childrenService.children);
  }

  goBack() {
    this.navCtrl.setRoot(HomePage);
  }

  areChildren() {
    if (this.childrenService.children.length == 0) {
      this.navCtrl.push(AddChildPage);
    }
  }

  remove(id, index) {
    this.loader = true;
    const requestData = {
      token: this.authService.userToken
    };
    this.subscriptionOne = this.requestService.deleteMethod('/children/' + id, requestData).subscribe(data => {
      if (!data.error) {
        console.log('Succes')
        this.timerService.breastFeeding.splice(index, 1);
        this.timerService.bottleFeeding.splice(index, 1);
        this.timerService.sleeping.splice(index, 1);
      } else {
        console.log('Error')
      }
      this.loader = false;
      this.updateKids();
    });
  }

  edition(child) {
    this.navCtrl.push(EditChildPage, {
      child: child
    });
  }

  updateKids() {
    this.loader = true;
    this.childrenService.children = [];
    const requestData = {
      token: this.authService.userToken
    }
    this.subscriptionTwo = this.requestService.getMethod('/children/parrent/' + this.authService.userID, requestData).subscribe(data => {
      let kids = data.data;
      if (data.data) {
        for (const child of kids) {
          this.childrenService.children.push(child);
        }
      }
      this.loader = false;
    });
  }

  showTime(time) {
    return moment(time).format('DD.MM.YYYY');
  }

}
