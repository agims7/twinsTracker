import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { NewEventPage } from '../new-event/new-event';

import { ChildrenService } from '../../services/children';
import { AuthService } from "../../services/auth";
import { RequestService } from "../../services/request";
import { AppService } from '../../services/app';

import { Subscription } from 'rxjs/Subscription';
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
  public url: string = null;
  public date: Date = moment()['_d'];
  public object = {
    monday: false,
    weekdays: ['Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'],
    months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
  };
  public togetherText : any = {
    pl: "Razem",
    en: "Together"
  };

  public subscriptionOne: Subscription;
  public subscriptionTwo: Subscription;
  public subscriptionThree: Subscription;

  constructor(
    private translate: TranslateService,
    private appService: AppService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public childrenService: ChildrenService,
    public authService: AuthService,
    public requestService: RequestService
  ) {
    moment.locale(this.translate.getDefaultLang());
    this.createTable();
  }

  ionViewDidLeave() {
    this.appService.safeUnsubscribe(this.subscriptionOne);
    this.appService.safeUnsubscribe(this.subscriptionTwo);
    this.appService.safeUnsubscribe(this.subscriptionThree);
  }

  ionViewDidEnter() {
    this.events = [];
    this.eventsDates = [];
    this.eventsFullDates = [];
    this.url = null;
    this.getAllData();
  }

  getAllData() {
    const requestData = {
      token: this.authService.userToken,
      body: {}
    };
    if (this.childrenService.children.length == 0) {
    } else if (this.childrenService.children.length == 1) {
      this.url = 'child';
      requestData.body = {
        child_id: this.childrenService.children[0].id
      };
    } else if (this.childrenService.children.length == 2) {
      this.url = 'children';
      requestData.body = {
        first_child_id: this.childrenService.children[0].id,
        second_child_id: this.childrenService.children[1].id
      };
    }
    this.subscriptionOne = this.requestService.postMethod('/timetable/' + this.url, requestData).subscribe(data => {
      if (!data.error) {
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

  addEvent() {
    const modal = this.modalCtrl.create(NewEventPage);
    modal.present();
  }

  createTable() {
    this.choiceArray = _.clone(this.childrenService.children);
    this.choiceArray.unshift({ name: this.togetherText[this.translate.getDefaultLang()] });
  }

  makeChoice(id) {
    this.loader = true;
    const requestData = {
      token: this.authService.userToken,
    }
    if (this.choiceArray[id].id) {
      let childId = this.choiceArray[id].id
      this.subscriptionTwo = this.requestService.getMethod('/timetable/child/' + childId, requestData).subscribe(data => {
        if (!data.error) {
          this.mainData = data.data;
          this.events = _.clone(this.mainData);
          this.eventsDates = this.events.map(item => item.date.slice(0, -14)).filter((value, index, self) => self.indexOf(value) === index);
          this.eventsFullDates = this.events.map(item => item.date).filter((value, index, self) => self.indexOf(value) === index);
        }
        this.loader = false;
      });
    } else {
      this.subscriptionThree = this.requestService.getMethod('/timetable/', requestData).subscribe(data => {
        if (!data.error) {
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
