import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ModalPage } from '../modal/modal';

import { ChildrenService } from "../../services/children";
import { RequestService } from "../../services/request";
import { TimerService } from "../../services/timer";
import { AuthService } from "../../services/auth";

import * as _ from 'lodash';

@IonicPage() @Component({
  selector: 'page-breast-feeding',
  templateUrl: 'breast-feeding.html',
})
export class BreastFeedingPage {
  public loader: boolean = true;
  public together: boolean = true;
  public childrenBreasts: any = [];
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
    this.setChildrenBreasts();
    this.getAllBreast();
  }

  cleraAll() {
    this.childrenBreasts = [];
    this.childrenIds = [];
    this.loader = true;
  }

  getAllBreast() {
    let requestData = {
      token: this.authService.userToken
    }
    this.requestService.getMethod('/breast/today/' , requestData).subscribe(data => {
      if (data.data.length > 0) {
        this.allData = data.data;
        console.log(data.data)
      } else {
        console.log('Brak danych')
      }
      this.loader = false;
    });
  }

  getChildBreast(id) {
    return _.filter(this.allData, { 'child_id': id });
  }


  setChildrenBreasts() {
    for (var child of this.childrenService.children) {
      this.childrenIds.push(child.id)
    }
  }

  feedingOption() {
    this.together = this.together ? false : true;
  }

  openModal(index) {
    this.navCtrl.push(ModalPage, { "category": "breastFeeding", "text": "Karmienie piersią", "together": this.together, "child": index });
  }

}