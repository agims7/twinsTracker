import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ModalPage } from '../modal/modal';

import { ChildrenService } from '../../services/children';
import { RequestService } from "../../services/request";
import { TimerService } from "../../services/timer";
import { AuthService } from "../../services/auth";

import * as moment from 'moment';
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
    this.setChildrenSleeps();
    this.getAllSleep();
  }

  cleraAll() {
    this.childrenSleeps = [];
    this.childrenIds = [];
    this.loader = true;
  }

  getAllSleep() {
    let requestData = {
      token: this.authService.userToken
    }
    this.requestService.getMethod('/sleep/today/' , requestData).subscribe(data => {
      console.log(data, 'SLEEEP')
      if (data.data.length > 0) {
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
    for (var child of this.childrenService.children) {
      this.childrenIds.push(child.id)
    }
  }

  slippingOption() {
    this.together  = this.together ? false : true;
  }

  openModal(index) {
    this.navCtrl.push(ModalPage, {"category": "sleeping", "text": "Spanie", "together": this.together, "child": index });
  }

}
