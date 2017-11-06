import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ModalPage } from '../modal/modal';

import { ChildrenService } from '../../services/children';
import { RequestService } from "../../services/request";
import { TimerService } from '../../services/timer';

import * as moment from 'moment';

@Component({
  selector: 'page-diaper',
  templateUrl: 'diaper.html',
})
export class DiaperPage {
  public together: boolean = true;
  public childrenDiapers: any = [];
  public childrenIds: any = [];
  public token: string;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public childrenService: ChildrenService,
    public timerService: TimerService,
    public requestService: RequestService,
    public storage: Storage
  ) {
  }

  ionViewWillEnter() {
    this.timerService.setDiaper();
  }

  ionViewDidEnter() {
    this.cleraAll();
    this.setChildrenDiapers();
    this.storage.get('userToken').then((userToken) => {
      this.token = userToken;
      this.iterateDiapers();
    });
  }

  iterateDiapers() {
    let count = 0;
    for (var child of this.childrenService.children) {
      let requestData = {
        token: this.token
      }
      this.getDiapers(requestData, child.id, child.name, count);
      count++;
    }
  }

  cleraAll() {
    this.childrenDiapers = [];
    this.childrenIds = [];
  }

  getDiapers(requestData, child, name, number) {
    this.requestService.getMethod('/diaper/child/today/' + child, requestData).subscribe(data => {
      if (data.data.length > 0) {
        console.log(data.data)
        if (data.data[0].id > this.childrenIds[0]) {
          this.childrenDiapers.push(data.data)
        } else {
          this.childrenDiapers.unshift(data.data)
        }
      }
    });
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
    const modal = this.modalCtrl.create(ModalPage, {"category": "diaper", "text": "Pieluszka", "together": this.together, "child": index });
    modal.present();
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

}
