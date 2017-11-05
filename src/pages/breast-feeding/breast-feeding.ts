import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ModalPage } from '../modal/modal';

import { ChildrenService } from "../../services/children";
import { RequestService } from "../../services/request";

import * as moment from 'moment';

@Component({
  selector: 'page-breast-feeding',
  templateUrl: 'breast-feeding.html',
})
export class BreastFeedingPage {
  public together: boolean = true;
  public childrenBreasts: any = [];
  public childrenIds: any = [];
  public token: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public childrenService: ChildrenService,
    public requestService: RequestService,
    public storage: Storage
  ) {

  }

  ionViewDidEnter() {
    this.cleraAll();
    this.setChildrenBreasts();
    this.storage.get('userToken').then((userToken) => {
      this.token = userToken;
      console.log('cos w storage')
      this.iterateBreasts();
    });
  }

  iterateBreasts() {
    console.log('cos tu iterate')
    let count = 0;
    for (var child of this.childrenService.children) {
      let requestData = {
        token: this.token
      }
      this.getBreasts(requestData, child.id, child.name, count);
      count++;
    }
  }

  cleraAll() {
    this.childrenBreasts = [];
    this.childrenIds = [];
  }

  getBreasts(requestData, child, name, number) {
    console.log('cos tu get breast')
    this.requestService.getMethod('/breast/child/' + child, requestData).subscribe(data => {
      if (data.data.length > 0) {
        if (data.data[0].id > this.childrenIds[0]) {
          this.childrenBreasts.push(data.data)
        } else {
          this.childrenBreasts.unshift(data.data)
        }
      }
    });
  }

  setChildrenBreasts() {
    console.log('cos tu')
    for (var child of this.childrenService.children) {
      this.childrenIds.push(child.id)
    }
    console.log('cos tu1')
  }

  feedingOption() {
    this.together = this.together ? false : true;
  }

  openModal(index) {
    const modal = this.modalCtrl.create(ModalPage, { "category": "breastFeeding", "text": "Karmienie piersią", "together": this.together, "child": index });
    modal.present();
  }

  toTime(date) {
    return moment.unix(date).format('HH:mm');
  }

}