import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { HomePage } from '../../pages/home/home';

import { RequestService } from "../../services/request";
import { ChildrenService } from '../../services/children';
import { AuthService } from "../../services/auth";
import { AppService } from '../../services/app';

import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import * as _ from 'lodash';


@IonicPage() @Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage {
  public loader: boolean = true;
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

  public subscriptionOne: Subscription;
  public subscriptionTwo: Subscription;
  
  constructor(
    private translate: TranslateService,
    private appService: AppService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public childrenService: ChildrenService,
    public requestService: RequestService,
    public authService: AuthService
  ) {
    moment.locale(this.translate.getDefaultLang());
    this.createTable();
  }

  ionViewDidLeave() {
    this.appService.safeUnsubscribe(this.subscriptionOne);
    this.appService.safeUnsubscribe(this.subscriptionTwo);
  }

  ionViewDidEnter() {
    this.time = moment().format('HH:mm:ss');
    this.loader = false;
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
    console.log('kliknieto')
    this.loader = true;
      let date = moment(this.date).format('YYYY-MM-DD');
      if (this.kid == 'Razem') {
        for (const child of this.childrenService.children) {
          const requestData = {
            token: this.authService.userToken,
            body: {
              'child_id': child.id,
              'date': date,
              'time': this.time,
              'description': this.description
            }
          }
          this.subscriptionOne = this.requestService.postMethod('/timetable/', requestData).subscribe(data => {
            if (!data.error) {
              console.log('Succes')
            } else {
              console.log('Error')
            }
            this.loader = false;
            this.navCtrl.setRoot(HomePage);
          });
        }
      } else {
        const requestData = {
          token: this.authService.userToken,
          body: {
            'child_id': this.kid,
            'date': date,
            'time': this.time,
            'description': this.description
          }
        }
        this.subscriptionTwo = this.requestService.postMethod('/timetable/', requestData).subscribe(data => {
          if (!data.error) {
            console.log('Succes')
          } else {
            console.log('Error')
          }
          this.loader = false;
          this.navCtrl.setRoot(HomePage);
        });
      }
  }

}
