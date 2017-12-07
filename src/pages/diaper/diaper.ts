import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';
import { EditActivityPage } from '../edit-activity/edit-activity';
import { ChildrenService } from '../../services/children';
import { RequestService } from "../../services/request";
import { TimerService } from '../../services/timer';
import { AuthService } from "../../services/auth";
import { AppService } from '../../services/app';

import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import * as _ from 'lodash';

@IonicPage() @Component({
  selector: 'page-diaper',
  templateUrl: 'diaper.html',
})
export class DiaperPage {
  public loader: boolean = true;
  public together: boolean = true;
  public childrenDiapers: any = [];
  public childrenIds: any = [];
  public allData: any = [];

  public subscriptionOne: Subscription;
  
  constructor(
    private appService: AppService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public childrenService: ChildrenService,
    public timerService: TimerService,
    public requestService: RequestService,
    public authService: AuthService
  ) {
  }

  ionViewDidLeave() {
    this.appService.safeUnsubscribe(this.subscriptionOne);
  }

  ionViewWillEnter() {
    this.timerService.setDiaper();
  }

  ionViewDidEnter() {
    this.cleraAll();
    this.setChildrenDiapers();
    this.getAllDiaper();
  }

  cleraAll() {
    this.childrenDiapers = [];
    this.childrenIds = [];
    this.loader = true;
    
  }

  getAllDiaper() {
    let requestData = {
      token: this.authService.userToken
    }
    this.subscriptionOne = this.requestService.getMethod('/diaper/today/' , requestData).subscribe(data => {
      if (data.data.length > 0) {
        this.allData = data.data;
      } else {
        console.log('Brak danych')
      }
      this.loader = false;
    });
  }

  getChildDiaper(id) {
    return _.filter(this.allData, { 'child_id': id });
  }

  setChildrenDiapers() {
    for (var child of this.childrenService.children) {
      this.childrenIds.push(child.id)
    }
  }

  diaperOption() {
    this.together  = this.together ? false : true;
  }

  openModal(index) {
    this.navCtrl.push(ModalPage, {"category": "diaper", "text": "Pieluszka", "together": this.together, "child": index });
  }

  setDiaperType(type) {
    switch (type) {
      case (1): {
        return 'Kupka';
      }
        case (2): {
          return 'Siku';
        }
    }
  }

  toTime(date) {
    let newDate = new Date(date)
    return moment(newDate).format('HH:mm');
  }

  moreActions(type, data) {
    this.navCtrl.push(EditActivityPage, {
      'type': type,
      'data': data
    });
  }

}
