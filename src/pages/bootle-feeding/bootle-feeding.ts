import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ModalPage } from '../modal/modal';

import { ChildrenService } from '../../services/children';
import { RequestService } from "../../services/request";

import * as moment from 'moment';

@Component({
  selector: 'page-bootle-feeding',
  templateUrl: 'bootle-feeding.html',
})
export class BootleFeedingPage {
  public together: boolean = true;
  public childrenBootles: any = [];
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
    this.setChildrenBootles();
    this.storage.get('userToken').then((userToken) => {
      this.token = userToken;
      this.iterateBootles();
    });
  }

  iterateBootles() {
    let count = 0;
    for (var child of this.childrenService.children) {
      let requestData = {
        token: this.token
      }
      this.getBootles(requestData, child.id, child.name, count);
      count++;
    }
  }

  cleraAll() {
    this.childrenBootles = [];
    this.childrenIds = [];
  }

  getBootles(requestData, child, name, number) {
    this.requestService.getMethod('/bootle/child/' + child, requestData).subscribe(data => {
      if (data.data.length > 0) {
        if (data.data[0].id > this.childrenIds[0]) {
          this.childrenBootles.push(data.data)
        } else {
          this.childrenBootles.unshift(data.data)
        }
      }
    });
  }

  setChildrenBootles() {
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
    return moment.unix(date).format('HH:mm');
  }

}
