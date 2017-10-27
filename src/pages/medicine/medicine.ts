import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ModalPage } from '../modal/modal';

import { ChildrenService } from '../../services/children';

@Component({
  selector: 'page-medicine',
  templateUrl: 'medicine.html',
})
export class MedicinePage {
  public together: boolean = true;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public childrenService: ChildrenService
  ) {
  }

  medicineOption() {
    this.together  = this.together ? false : true;
  }

  openModal(index) {
    const modal = this.modalCtrl.create(ModalPage, {"category": "medicine", "text": "Lekarstwa", "together": this.together, "child": index });
    modal.present();
  }

}
