import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ModalPage } from '../modal/modal';

import { ChildrenService } from '../../services/children';
import { RequestService } from "../../services/request";
import { TimerService } from "../../services/timer";

import * as moment from 'moment';

@Component({
  selector: 'page-sleeping',
  templateUrl: 'sleeping.html',
})
export class SleepingPage {
  public together: boolean = true;
  public childrenSleeps: any = [];
  public childrenIds: any = [];
  public token: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public childrenService: ChildrenService,
    public requestService: RequestService,
    public timerService: TimerService,    
    public storage: Storage
  ) {
  }

  ionViewDidEnter() {
    this.cleraAll();
    this.setChildrenSleeps();
    this.storage.get('userToken').then((userToken) => {
      this.token = userToken;
      this.iterateSleeps();
    });
  }

  iterateSleeps() {
    let count = 0;
    for (var child of this.childrenService.children) {
      let requestData = {
        token: this.token
      }
      this.getSleeps(requestData, child.id, child.name, count);
      count++;
    }
  }

  cleraAll() {
    this.childrenSleeps = [];
    this.childrenIds = [];
  }

  getSleeps(requestData, child, name, number) {
    this.requestService.getMethod('/sleep/child/today/' + child, requestData).subscribe(data => {
      if (data.data.length > 0) {
        if (data.data[0].id > this.childrenIds[0]) {
          this.childrenSleeps.push(data.data)
        } else {
          this.childrenSleeps.unshift(data.data)
        }
      }
    });
  }

  setChildrenSleeps() {
    for (var child of this.childrenService.children) {
      this.childrenIds.push(child.id)
    }
  }

  slippingOption() {
    this.together  = this.together ? false : true;
  }

  openModal(index) {
    const modal = this.modalCtrl.create(ModalPage, {"category": "sleeping", "text": "Spanie", "together": this.together, "child": index });
    modal.present();
  }

  toTime(date) {
    let newDate = new Date(date)
    return moment(newDate).format('HH:mm');
  }

}
