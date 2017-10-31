import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { StatisticModalPage } from '../statistic-modal/statistic-modal';

import { ChildrenService } from '../../services/children';


@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
  ) {
  }

  openStatisticModal(type) {
    const modal = this.modalCtrl.create(StatisticModalPage, {"category": type });
    modal.present();
  }
}
