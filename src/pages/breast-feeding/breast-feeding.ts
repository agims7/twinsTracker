import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ModalPage } from '../modal/modal';

import { ChildrenService } from "../../services/children";
import { TimerService } from "../../services/timer";

@Component({
  selector: 'page-breast-feeding',
  templateUrl: 'breast-feeding.html',
})
export class BreastFeedingPage {
  public together: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public timerService: TimerService,
    public childrenService: ChildrenService
  ) {
    this.timerService.setTimerObjects();
  }

  feedingOption() {
    this.together  = this.together ? false : true;
  }

  openModal(index) {
    const modal = this.modalCtrl.create(ModalPage, {"category": "breastFeeding", "text": "Karmienie piersią", "together": this.together, "child": index });
    modal.present();
  }

}