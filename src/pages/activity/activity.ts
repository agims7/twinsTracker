import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ChildrenService } from '../../services/children';

import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage implements OnInit {
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
    public childrenService: ChildrenService
  ) {
    moment.locale('pl');
    this.createTable();
  }

  ngOnInit() {
    this.showTime(this.date);
  }

  createTable() {
    this.choiceArray = _.clone(this.childrenService.children);
    this.choiceArray.unshift({ name: "Razem" });
  }

  makeChoice(index) {
    this.choice = index;
  }

  setDate(date: Date) {
    this.date = date;
  }

  showTime(time) {
    // return moment(time).format('DD.MM.YYYY');
    return moment(time).format('dddd DD.MM');
  }

}
