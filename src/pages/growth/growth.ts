import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';
import { EditActivityPage } from '../edit-activity/edit-activity';
import { ChildrenService } from '../../services/children';
import { RequestService } from "../../services/request";
import { TimerService } from "../../services/timer";
import { AuthService } from "../../services/auth";
import { AppService } from '../../services/app';

import { Subscription } from 'rxjs/Subscription';
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

  public subscriptionOne: Subscription;
  
  constructor(
    private appService: AppService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public childrenService: ChildrenService,
    public requestService: RequestService,
    public timerService: TimerService,
    public authService: AuthService
  ) {
  }

  ionViewDidLeave(): void {
    this.appService.safeUnsubscribe(this.subscriptionOne);
  }

  ionViewDidEnter(): void {
    this.cleraAll();
    this.setChildrenGrowth();
    this.getAllGrowth();
  }

  cleraAll(): void {
    this.childrenGrowths = [];
    this.childrenIds = [];
    this.loader = true;
  }

  getAllGrowth(): void {
    const requestData = {
      token: this.authService.userToken
    }
    this.subscriptionOne = this.requestService.getMethod('/growth/today/' , requestData).subscribe(data => {
      if (data.data.length) {
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

  setChildrenGrowth(): void {
    for (const child of this.childrenService.children) {
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
