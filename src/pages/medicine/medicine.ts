import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';
import { EditActivityPage } from '../edit-activity/edit-activity';
import { ChildrenService } from "../../services/children";
import { RequestService } from "../../services/request";
import { TimerService } from "../../services/timer";
import { AuthService } from "../../services/auth";
import { AppService } from '../../services/app';

import { Subscription } from 'rxjs/Subscription';
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

  public subscriptionOne: Subscription;

  constructor(
    private appService: AppService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public childrenService: ChildrenService,
    public requestService: RequestService,
    public timerService: TimerService,    
    public authService: AuthService
  ) {
  }

  ionViewDidLeave(): void {
    this.appService.safeUnsubscribe(this.subscriptionOne);
  }

  ionViewDidEnter(): void {
    this.cleraAll();
    this.setChildrenMedicines();
    this.getAllMedicine();
  }

  cleraAll(): void {
    this.childrenMedicines = [];
    this.childrenIds = [];
    this.loader = true;
  }

  getAllMedicine(): void {
    const requestData = {
      token: this.authService.userToken
    }
    this.subscriptionOne = this.requestService.getMethod('/medicine/today/' , requestData).subscribe(data => {
      if (data.data.length) {
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

  setChildrenMedicines(): void {
    for (const child of this.childrenService.children) {
      this.childrenIds.push(child.id)
    }
  }

  medicineOption(): void {
    this.together  = this.together ? false : true;
  }

  openModal(index) {
    this.navCtrl.push(ModalPage, {"category": "medicine", "text": "Lekarstwa", "together": this.together, "child": index });
  }

  moreActions(type, data) {
    this.navCtrl.push(EditActivityPage, {
      'type': type,
      'data': data
    });
  }
}
