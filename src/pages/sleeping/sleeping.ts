import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ModalPage } from '../modal/modal';

import { ChildrenService } from '../../services/children';

@Component({
  selector: 'page-sleeping',
  templateUrl: 'sleeping.html',
})
export class SleepingPage {
  public together: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public childrenService: ChildrenService
  ) {
  }

  slippingOption() {
    this.together  = this.together ? false : true;
  }

  openModal(index) {
    const modal = this.modalCtrl.create(ModalPage, {"category": "slipping", "text": "Spanie", "together": this.together, "child": index });
    modal.present();
  }

}
