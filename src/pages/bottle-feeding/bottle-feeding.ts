import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { ModalPage } from '../modal/modal';
import { EditActivityPage } from '../edit-activity/edit-activity';


import { ChildrenService } from '../../services/children';
import { RequestService } from "../../services/request";
import { TimerService } from "../../services/timer";
import { AuthService } from "../../services/auth";

import * as moment from 'moment';
import * as _ from 'lodash';

@IonicPage() @Component({
  selector: 'page-bottle-feeding',
  templateUrl: 'bottle-feeding.html',
})
export class BottleFeedingPage {
  public loader: boolean = true;
  public together: boolean = true;
  public childrenBottles: any = [];
  public childrenIds: any = [];
  public allData: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public childrenService: ChildrenService,
    public requestService: RequestService,
    public timerService: TimerService,
    public authService: AuthService
  ) {
  }

  ionViewDidEnter() {
    this.cleraAll();
    this.setChildrenBottles();
    this.getAllBreast();
  }

  cleraAll() {
    this.childrenBottles = [];
    this.childrenIds = [];
    this.loader = true;
  }

  getAllBreast() {
    let requestData = {
      token: this.authService.userToken
    }
    this.requestService.getMethod('/bottle/today/' , requestData).subscribe(data => {
      if (data.data.length > 0) {
        this.allData = data.data;
      } else {
        console.log('Brak danych')
      }
      this.loader = false;
    });
  }

  getChildBottles(id) {
    return _.filter(this.allData, { 'child_id': id });
  }

  setChildrenBottles() {
    for (var child of this.childrenService.children) {
      this.childrenIds.push(child.id)
    }
  }

  feedingOption() {
    this.together  = this.together ? false : true;
  }

  openModal(index) {
    this.navCtrl.push(ModalPage, {"category": "bottleFeeding", "text": "Karmienie butelką", "together": this.together, "child": index });
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
