import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';
import { EditActivityPage } from '../edit-activity/edit-activity';
import { ChildrenService } from '../../services/children';
import { RequestService } from "../../services/request";
import { TimerService } from "../../services/timer";
import { AuthService } from "../../services/auth";
import { AppService } from '../../services/app';

import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-sleeping',
  templateUrl: 'sleeping.html',
})
export class SleepingPage {
  public loader: boolean = true;
  public together: boolean = true;
  public childrenSleeps: any = [];
  public childrenIds: any = [];
  public allData: any = [];

  public subscriptionOne: Subscription;

  constructor(
    private appService: AppService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public childrenService: ChildrenService,
    public requestService: RequestService,
    public timerService: TimerService,    
    public authService: AuthService
  ) {
  }

  ionViewDidLeave() {
    this.appService.safeUnsubscribe(this.subscriptionOne);
  }

  ionViewDidEnter() {
    this.cleraAll();
    this.setChildrenSleeps();
    this.getAllSleep();
  }

  cleraAll() {
    this.childrenSleeps = [];
    this.childrenIds = [];
    this.loader = true;
  }

  getAllSleep() {
    const requestData = {
      token: this.authService.userToken
    }
    this.subscriptionOne = this.requestService.getMethod('/sleep/today/' , requestData).subscribe(data => {
      console.log(data, 'SLEEEP')
      if (data.data.length) {
        this.allData = data.data;
      } else {
        console.log('Brak danych')
      }
      this.loader = false;
    });
  }

  getChildBreast(id) {
    return _.filter(this.allData, { 'child_id': id });
  }

  setChildrenSleeps() {
    for (const child of this.childrenService.children) {
      this.childrenIds.push(child.id)
    }
  }

  slippingOption() {
    this.together  = this.together ? false : true;
  }

  openModal(index) {
    this.navCtrl.push(ModalPage, {"category": "sleeping", "text": "Spanie", "together": this.together, "child": index });
  }

  moreActions(type, data) {
    this.navCtrl.push(EditActivityPage, {
      'type': type,
      'data': data
    });
  }

}
