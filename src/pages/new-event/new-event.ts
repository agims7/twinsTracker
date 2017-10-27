import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ChildrenService } from '../../services/children';

import * as moment from 'moment';
import * as _ from 'lodash';


@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage {
  public choiceArray: any = [];
  public choice: number = 0;

  public date: Date = moment()['_d'];
  public object = {
    monday: false,
    weekdays: ['Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'],
    months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
  };
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public childrenService: ChildrenService
  ) {
    moment.locale('pl');
    this.createTable();
  }

  createTable() {
    this.choiceArray = _.clone(this.childrenService.children);
    this.choiceArray.unshift({ name: "Razem" });
  }

  setDate(date: Date) {
    this.date = date;
  }

  showTime(time) {
    return moment(time).format('DD.MM.YYYY');
  }

}
