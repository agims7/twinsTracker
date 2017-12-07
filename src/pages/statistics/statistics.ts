import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StatisticModalPage } from '../statistic-modal/statistic-modal';

import { ChildrenService } from '../../services/children';
import { AppService } from '../../services/app';

import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {

  constructor(
    private appService: AppService,
    public navCtrl: NavController,
    public navParams: NavParams
    ) {
  }

  ioncViewDidEnter() {
  }

  openStatisticModal(type) {
    this.navCtrl.push(StatisticModalPage, {"category": type });
  }
}
