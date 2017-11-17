import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ModalPage } from '../modal/modal';
import { EditActivityPage } from '../edit-activity/edit-activity';

import { ChildrenService } from '../../services/children';
import { RequestService } from "../../services/request";
import { TimerService } from "../../services/timer";
import { AuthService } from "../../services/auth";

import * as moment from 'moment';
import * as _ from 'lodash';

@IonicPage() @Component({
  selector: 'page-growth',
  templateUrl: 'growth.html',
})
export class GrowthPage {
  public loader: boolean = true;
  public together: boolean = false;
  public childrenGrowths: any = [];
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
    this.setChildrenGrowth();
    this.getAllGrowth();
  }

  cleraAll() {
    this.childrenGrowths = [];
    this.childrenIds = [];
    this.loader = true;
  }

  getAllGrowth() {
    let requestData = {
      token: this.authService.userToken
    }
    this.requestService.getMethod('/growth/today/' , requestData).subscribe(data => {
      if (data.data.length > 0) {
        this.allData = data.data;
      } else {
        console.log('Brak danych')
      }
      this.loader = false;
    });
  }

  getChildGrowths(id) {
    return _.filter(this.allData, { 'child_id': id });
    
  }

  setChildrenGrowth() {
    for (var child of this.childrenService.children) {
      this.childrenIds.push(child.id)
    }
  }

  openModal(index) {
    this.navCtrl.push(ModalPage, {"category": "growth", "text": "Wzrost", "together": this.together, "child": index });
  }

  moreActions(type, data) {
    this.navCtrl.push(EditActivityPage, {
      'type': type,
      'data': data
    });
  }

}
