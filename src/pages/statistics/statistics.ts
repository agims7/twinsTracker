import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { StatisticModalPage } from '../statistic-modal/statistic-modal';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {

  constructor(
    public navCtrl: NavController,
    ) {
  }

  openStatisticModal(type: string): void {
    this.navCtrl.push(StatisticModalPage, {"category": type });
  }
}
