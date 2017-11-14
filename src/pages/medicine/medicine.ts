import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ModalPage } from '../modal/modal';

import { ChildrenService } from "../../services/children";
import { RequestService } from "../../services/request";
import { TimerService } from "../../services/timer";
import { AuthService } from "../../services/auth";

import * as moment from 'moment';
import * as _ from 'lodash';

@IonicPage() @Component({
  selector: 'page-medicine',
  templateUrl: 'medicine.html',
})
export class MedicinePage {
  public loader: boolean = true;
  public together: boolean = true;
  public childrenMedicines: any = [];
  public childrenIds: any = [];
  public allData: any = [];

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
    this.getAllMedicine();
  }

  cleraAll() {
    this.childrenMedicines = [];
    this.childrenIds = [];
    this.loader = true;
  }

  getAllMedicine() {
    let requestData = {
      token: this.authService.userToken
    }
    this.requestService.getMethod('/medicine/today/' , requestData).subscribe(data => {
      if (data.data.length > 0) {
        this.allData = data.data;
      } else {
        console.log('Brak danych')
      }
      this.loader = false;
    });
  }

  getChildBreast(id) {
    return _.filter(this.allData, { 'child_id': id });
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
    this.navCtrl.push(ModalPage, {"category": "medicine", "text": "Lekarstwa", "together": this.together, "child": index });
  }

}
