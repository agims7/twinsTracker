import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { NewEventPage } from '../new-event/new-event';

import { ChildrenService } from '../../services/children';
import { AuthService } from "../../services/auth";
import { RequestService } from "../../services/request";

import * as moment from 'moment';
import * as _ from 'lodash';

@IonicPage() @Component({
  selector: 'page-timetable',
  templateUrl: 'timetable.html',
})
export class TimetablePage {
  public loader: boolean = true;
  public dates: any;
  public kid: string;
  public choiceArray: any = [];
  public mainData: any = [];
  public choice: number = 0;
  public events: any = [];
  public eventsDates: any = [];
  public eventsFullDates: any = [];
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
    public childrenService: ChildrenService,
    public authService: AuthService,
    public requestService: RequestService
  ) {
    moment.locale('pl');
    this.createTable();
  }

  ionViewDidEnter() {
    this.events = [];
    this.eventsDates = [];
    this.eventsFullDates = [];
    this.getAllData();
  }

  getAllData() {
    let requestData = {
      token: this.authService.userToken,
    }
    this.requestService.getMethod('/timetable/', requestData).subscribe(data => {
      if (data.error === false) {
        this.mainData = data.data;
        this.events = _.clone(this.mainData);
        this.eventsDates = this.events.map(item => item.date.slice(0, -14)).filter((value, index, self) => self.indexOf(value) === index);
        this.eventsFullDates = this.events.map(item => item.date).filter((value, index, self) => self.indexOf(value) === index);
      }
      this.loader = false;
    });
  }

  getEventsForDay(index) {
    let text = this.eventsFullDates[index];
    return _.filter(this.events, ['date', text]);
  }

  getChildNameFromId(id) {
    let childIndex = _.findIndex(this.childrenService.children, { 'id': id });
    return this.childrenService.children[childIndex].name;
  }

  getChildPhotoFromId(id) {
    let childIndex = _.findIndex(this.childrenService.children, { 'id': id });
    let photo = this.childrenService.children[childIndex].photo;
    if (!photo || photo == null) {
      return "http://via.placeholder.com/150x150";
    } else {
      return photo;
    }
  }

  addEvent() {
    const modal = this.modalCtrl.create(NewEventPage);
    modal.present();
  }

  createTable() {
    this.choiceArray = _.clone(this.childrenService.children);
    this.choiceArray.unshift({ name: "Razem" });
  }

  makeChoice(id) {
    this.loader = true;
    let requestData = {
      token: this.authService.userToken,
    }
    if (this.choiceArray[id].id) {
      let childId = this.choiceArray[id].id
      this.requestService.getMethod('/timetable/child/' + childId, requestData).subscribe(data => {
        if (data.error === false) {
          this.mainData = data.data;
          this.events = _.clone(this.mainData);
          this.eventsDates = this.events.map(item => item.date.slice(0, -14)).filter((value, index, self) => self.indexOf(value) === index);
          this.eventsFullDates = this.events.map(item => item.date).filter((value, index, self) => self.indexOf(value) === index);
        }
        this.loader = false;
      });
    } else {
      this.requestService.getMethod('/timetable/', requestData).subscribe(data => {
        if (data.error === false) {
          this.mainData = data.data;
          this.events = _.clone(this.mainData);
          this.eventsDates = this.events.map(item => item.date.slice(0, -14)).filter((value, index, self) => self.indexOf(value) === index);

          this.eventsFullDates = this.events.map(item => item.date).filter((value, index, self) => self.indexOf(value) === index);
        }
        this.loader = false;
      });
    }
  }

  setDate(date: Date) {
    this.date = date;
  }

  toDay(date) {
    return moment(date).format('DD MMMM YYYY');
  }

  toTime(date, time) {
    let newDate = date.slice(0, -14) + 'T' + time + '.000Z';
    return moment.utc(newDate).format('LT');
  }

  showTime(time) {
    return moment(time).format('DD.MM.YYYY');
  }

}
