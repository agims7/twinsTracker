import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ModalPage } from '../modal/modal';

import { ChildrenService } from '../../services/children';
import { RequestService } from "../../services/request";

import * as moment from 'moment';

@Component({
  selector: 'page-growth',
  templateUrl: 'growth.html',
})
export class GrowthPage {
  public together: boolean = false;
  public childrenGrowths: any = [];
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
    this.setChildrenGrowth();
    this.storage.get('userToken').then((userToken) => {
      this.token = userToken;
      this.iterateGrowth();
    });
  }

  iterateGrowth() {
    let count = 0;
    for (var child of this.childrenService.children) {
      let requestData = {
        token: this.token
      }
      this.getGrowth(requestData, child.id, child.name, count);
      count++;
    }
  }

  cleraAll() {
    this.childrenGrowths = [];
    this.childrenIds = [];
  }

  getGrowth(requestData, child, name, number) {
    console.log('zapytanie')
    this.requestService.getMethod('/growth/child/' + child, requestData).subscribe(data => {
      if (data.data.length > 0) {
        console.log(data)
        if (data.data[0].id > this.childrenIds[0]) {
          this.childrenGrowths.push(data.data)
        } else {
          this.childrenGrowths.unshift(data.data)
        }
      }
    });
  }

  setChildrenGrowth() {
    for (var child of this.childrenService.children) {
      this.childrenIds.push(child.id)
    }
  }

  growthOption() {
    // this.together  = this.together ? false : true;
    //no action
  }

  openModal(index) {
    const modal = this.modalCtrl.create(ModalPage, {"category": "growth", "text": "Wzrost", "together": this.together, "child": index });
    modal.present();
  }

  toTime(date) {
    return moment.unix(date).format('HH:mm');
  }

}
