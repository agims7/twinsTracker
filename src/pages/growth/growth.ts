import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ModalPage } from '../modal/modal';

import { ChildrenService } from '../../services/children';

@Component({
  selector: 'page-growth',
  templateUrl: 'growth.html',
})
export class GrowthPage {
  public together: boolean = false;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public childrenService: ChildrenService
  ) {
  }

  growthOption() {
    // this.together  = this.together ? false : true;
    //no action
  }

  openModal(index) {
    const modal = this.modalCtrl.create(ModalPage, {"category": "growth", "text": "Wzrost", "together": this.together, "child": index });
    modal.present();
  }

}
