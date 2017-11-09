import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

import { RequestService } from "../../services/request";
import { ChildrenService } from '../../services/children';
import { AuthService } from "../../services/auth";

import * as moment from 'moment';
import * as _ from 'lodash';


@IonicPage() @Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage {
  public choiceArray: any = [];
  public choice: number = 0;
  public kid: string = 'Razem';
  public description: string;

  public date: Date = moment()['_d'];
  public object = {
    monday: false,
    weekdays: ['Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'],
    months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
  };
  public time: string;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public childrenService: ChildrenService,
    public requestService: RequestService,
    public authService: AuthService
  ) {
    moment.locale('pl');
    this.createTable();
  }

  ionViewDidEnter() {
    this.time = moment().format('HH:mm:ss');
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

  addEvent() {
      let date = moment(this.date).format('YYYY-MM-DD');
      if (this.kid == 'Razem') {
        for (var child of this.childrenService.children) {
          let requestData = {
            token: this.authService.userToken,
            body: {
              'child_id': child.id,
              'date': date,
              'time': this.time,
              'description': this.description
            }
          }
          this.requestService.postMethod('/timetable', requestData).subscribe(data => {
            if (data.error === false) {
              console.log('Succes')
            } else {
              console.log('Error')
            }
            this.navCtrl.setRoot(HomePage);
          });
        }
      } else {
        let requestData = {
          token: this.authService.userToken,
          body: {
            'child_id': this.kid,
            'date': date,
            'time': this.time,
            'description': this.description
          }
        }
        this.requestService.postMethod('/timetable', requestData).subscribe(data => {
          if (data.error === false) {
            console.log('Succes')
          } else {
            console.log('Error')
          }
          this.navCtrl.setRoot(HomePage);
        });
      }
  }

}
