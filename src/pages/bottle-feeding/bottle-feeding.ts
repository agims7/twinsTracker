import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ModalPage } from '../modal/modal';

import { ChildrenService } from '../../services/children';
import { RequestService } from "../../services/request";
import { TimerService } from "../../services/timer";
import { AuthService } from "../../services/auth";

import * as moment from 'moment';

@Component({
  selector: 'page-bottle-feeding',
  templateUrl: 'bottle-feeding.html',
})
export class BottleFeedingPage {
  public together: boolean = true;
  public childrenBottles: any = [];
  public childrenIds: any = [];

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
    this.iterateBottles();
  }

  iterateBottles() {
    let count = 0;
    for (var child of this.childrenService.children) {
      let requestData = {
        token: this.authService.userToken
      }
      this.getBottles(requestData, child.id, child.name, count);
      count++;
    }
  }

  cleraAll() {
    this.childrenBottles = [];
    this.childrenIds = [];
  }

  getBottles(requestData, child, name, number) {
    this.requestService.getMethod('/bottle/child/today/' + child, requestData).subscribe(data => {
      if (data.data.length > 0) {
        if (data.data[0].child_id > this.childrenIds[0]) {
          this.childrenBottles.push(data.data)
        } else {
          this.childrenBottles.unshift(data.data)
        }
      }
    });
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
    const modal = this.modalCtrl.create(ModalPage, {"category": "bottleFeeding", "text": "Karmienie butelką", "together": this.together, "child": index });
    modal.present();
  }

  toTime(date) {
    let newDate = new Date(date)
    return moment(newDate).format('HH:mm');
  }

}
