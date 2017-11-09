import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ModalPage } from '../modal/modal';

import { ChildrenService } from "../../services/children";
import { RequestService } from "../../services/request";
import { TimerService } from "../../services/timer";
import { AuthService } from "../../services/auth";

import * as moment from 'moment';

@Component({
  selector: 'page-medicine',
  templateUrl: 'medicine.html',
})
export class MedicinePage {
  public together: boolean = true;
  public childrenMedicines: any = [];
  public childrenIds: any = [];
  
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
    this.setChildrenMedicines();
    this.iterateMedicines();
  }

  iterateMedicines() {
    let count = 0;
    for (var child of this.childrenService.children) {
      let requestData = {
        token: this.authService.userToken
      }
      this.getMedicines(requestData, child.id, child.name, count);
      count++;
    }
  }

  cleraAll() {
    this.childrenMedicines = [];
    this.childrenIds = [];
  }

  getMedicines(requestData, child, name, number) {
    this.requestService.getMethod('/medicine/child/today/' + child, requestData).subscribe(data => {
      if (data.data.length > 0) {
        if (data.data[0].id > this.childrenIds[0]) {
          this.childrenMedicines.push(data.data)
        } else {
          this.childrenMedicines.unshift(data.data)
        }
      }
    });
  }

  setChildrenMedicines() {
    for (var child of this.childrenService.children) {
      this.childrenIds.push(child.id)
    }
  }

  medicineOption() {
    this.together  = this.together ? false : true;
  }

  openModal(index) {
    const modal = this.modalCtrl.create(ModalPage, {"category": "medicine", "text": "Lekarstwa", "together": this.together, "child": index });
    modal.present();
  }

}
