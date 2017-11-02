import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ModalPage } from '../modal/modal';

import { ChildrenService } from '../../services/children';
import { TimerService } from '../../services/timer';

@Component({
  selector: 'page-diaper',
  templateUrl: 'diaper.html',
})
export class DiaperPage {
  public together: boolean = true;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public childrenService: ChildrenService,
    public timerService: TimerService
  ) {
  }

  ionViewWillEnter() {
    this.timerService.setDiaper();
  }

  diaperOption() {
    this.together  = this.together ? false : true;
  }

  openModal(index) {
    const modal = this.modalCtrl.create(ModalPage, {"category": "diaper", "text": "Pieluszka", "together": this.together, "child": index });
    modal.present();
  }

}
