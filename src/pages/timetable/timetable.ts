import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { NewEventPage } from '../new-event/new-event';

import { ChildrenService } from '../../services/children';

import * as moment from 'moment';
import * as _ from 'lodash';


@Component({
  selector: 'page-timetable',
  templateUrl: 'timetable.html',
})
export class TimetablePage {
  public kid: string;
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

  addEvent() {
    const modal = this.modalCtrl.create(NewEventPage);
    modal.present();
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

  toDay(date) {
    return moment.unix(date).format('DD MMMM YYYY');  
  }

  toTime(date) {
    return moment.unix(date).format('LT');  
  }

  showTime(time) {
    return moment(time).format('DD.MM.YYYY');
  }

}
