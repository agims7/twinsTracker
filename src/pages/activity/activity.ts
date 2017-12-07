import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { ChildrenService } from '../../services/children';
import { RequestService } from "../../services/request";
import { AuthService } from '../../services/auth';
import { TimerService } from "../../services/timer";
import { CategoriesService } from "../../services/categories";
import { AppService } from '../../services/app';

import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import * as _ from 'lodash';

@IonicPage() @Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {
  public loader: boolean = true;
  public choiceArray: any = [];
  public choice: number = 0;

  public date: Date = moment()['_d'];
  public today: Date = moment()['_d'];
  public minDate: Date = moment().subtract(30, 'day')['_d'];
  public children = [];
  public activityTable = [];
  public count: number = 0;
  public emptyTable: boolean = false;
  public arrowFutureDisable: boolean = true;
  public diffDay: boolean = true;
  public togetherText : any = {
    pl: "Razem",
    en: "Together"
  };
  public cancelText : any = {
    pl: "Wróc",
    en: "Cancel"
  };

  public subscriptionOne: Subscription;
  public subscriptionTwo: Subscription;
  public subscriptionThree: Subscription;
  public subscriptionFour: Subscription;
  public subscriptionFive: Subscription;
  public subscriptionSix: Subscription;
  public subscriptionSeven: Subscription;
  public subscriptionEight: Subscription;
  public subscriptionNine: Subscription;
  public subscriptionTen: Subscription;

  constructor(
    private translate: TranslateService,
    private appService: AppService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public requestService: RequestService,
    public childrenService: ChildrenService,
    public authService: AuthService,
    public timerService: TimerService,
    public categoriesService: CategoriesService
  ) {
    moment.locale(this.translate.getDefaultLang());
    this.createTable();
  }

  ionViewDidLeave() {
    this.appService.safeUnsubscribe(this.subscriptionOne);
    this.appService.safeUnsubscribe(this.subscriptionTwo);
    this.appService.safeUnsubscribe(this.subscriptionThree);
    this.appService.safeUnsubscribe(this.subscriptionFour);
    this.appService.safeUnsubscribe(this.subscriptionFive);
    this.appService.safeUnsubscribe(this.subscriptionSix);
    this.appService.safeUnsubscribe(this.subscriptionSeven);
    this.appService.safeUnsubscribe(this.subscriptionEight);
    this.appService.safeUnsubscribe(this.subscriptionNine);
    this.appService.safeUnsubscribe(this.subscriptionTen);
  }

  ionViewDidEnter() {
    this.clear();
    this.showTime(this.date);
    this.children = [];
    this.activityTable = [];
    this.getChildActivity();
  }

  clear() {
    this.count = 0;
    this.loader = true;
  }

  createTable() {
    this.choiceArray = _.clone(this.childrenService.children);
    this.choiceArray.unshift({ name: this.togetherText[this.translate.getDefaultLang()] });
  }

  makeChoice(index) {
    this.choice = index;
    let child_id = this.choiceArray[this.choice].id;
    this.checkDates();
    if (child_id) {
      if (!this.diffDay) {
        this.getSingleChildActivity(child_id);
      } else {
        let diff = moment().diff(this.date, 'days');
        this.date = moment().subtract(diff, 'day')['_d'];
        let id = child_id;
        let requestData = {
          token: this.authService.userToken,
          body: {
            'id': id,
            'count': -(diff)
          }
        }
        this.subscriptionOne = this.requestService.postMethod('/activity/child/day', requestData).subscribe(data => {
          if (data.error === false) {
            if (data.data.length > 0) {
              this.activityTable = data.data;
              this.emptyTable = false;
            } else {
              this.emptyTable = true;
              this.activityTable = [];
            }
          }
        });
      }
    } else {
      if (!this.diffDay) {
        this.getChildActivity()
      } else {
        let diff = moment().diff(this.date, 'days');
        this.date = moment().subtract(diff, 'day')['_d'];

        if (this.children.length > 1) {
          let requestData = {
            token: this.authService.userToken,
            body: {
              'id1': this.children[0],
              'id2': this.children[1],
              'count': -(diff)
            }
          }
          this.subscriptionTwo = this.requestService.postMethod('/activity/childs/day', requestData).subscribe(data => {
            if (data.error === false) {
              if (data.data.length > 0) {
                this.activityTable = data.data;
                this.emptyTable = false;
              } else {
                this.emptyTable = true;
                this.activityTable = [];
              }
            }
          });
        }
        else if (this.children.length === 1) {
          let id = this.children[0];
          let requestData = {
            token: this.authService.userToken,
            body: {
              'id': id,
              'count': -(diff)
            }
          }
          this.subscriptionThree = this.requestService.postMethod('/activity/child/day', requestData).subscribe(data => {
            if (data.error === false) {
              if (data.data.length > 0) {
                this.activityTable = data.data;
                this.emptyTable = false;
              } else {
                this.emptyTable = true;
                this.activityTable = [];
              }
            }
          });
        } else {
          this.emptyTable = true;
        }
      }
    }
    this.checkDates();
  }

  checkDates() {
    let date1 = (moment(this.date).format('l'));
    let date2 = (moment(this.today).format('l'));
    if (date1 == date2) {
      this.arrowFutureDisable = true;
      this.diffDay = false;
    } else {
      this.arrowFutureDisable = false;
      this.diffDay = true;
    }
  }

  setDate(date: Date) {
    this.choice = 0;
    let diff = moment().diff(date, 'days');
    if (moment().diff(date, 'days') > 0) {
      this.date = moment().subtract(diff, 'day')['_d'];
    } else {
      this.date = moment()['_d'];
      this.getChildActivity();
      return true;
    }
    this.children = [];
    for (var child of this.childrenService.children) {
      this.children.push(child.id)
    }

    if (this.children.length > 1) {
      let requestData = {
        token: this.authService.userToken,
        body: {
          'id1': this.children[0],
          'id2': this.children[1],
          'count': -(diff)
        }
      }
      this.subscriptionFour = this.requestService.postMethod('/activity/childs/day', requestData).subscribe(data => {
        if (data.error === false) {
          if (data.data.length > 0) {
            this.activityTable = data.data;
            this.emptyTable = false;
          } else {
            this.emptyTable = true;
            this.activityTable = [];
          }
        }
      });
    }
    else if (this.children.length === 1) {
      let id = this.children[0];
      let requestData = {
        token: this.authService.userToken,
        body: {
          'id': id,
          'count': -(diff)
        }
      }
      this.subscriptionFive = this.requestService.postMethod('/activity/child/day', requestData).subscribe(data => {
        if (data.error === false) {
          if (data.data.length > 0) {
            this.activityTable = data.data;
            this.emptyTable = false;
          } else {
            this.emptyTable = true;
            this.activityTable = [];
          }
        }
      });
    } else {
      this.emptyTable = true;
    }
    this.checkDates();
  }

  showTime(time) {
    return moment(time).format('dddd DD.MM');
  }

  showDayTime(time) {
    return moment(time).format('HH:mm');
  }

  getChildActivity() {
    this.loader = true;
    this.date = moment()['_d'];
    this.children = [];
    for (var child of this.childrenService.children) {
      this.children.push(child.id)
    }
    if (this.children.length > 1) {
      let requestData = {
        token: this.authService.userToken,
        body: {
          'id1': this.children[0],
          'id2': this.children[1]
        }
      }
      this.subscriptionSix = this.requestService.postMethod('/activity/childs', requestData).subscribe(data => {
        if (data.error === false) {
          if (data.data.length > 0) {
            this.activityTable = data.data;
            this.emptyTable = false;
          } else {
            this.emptyTable = true;
            this.activityTable = [];
          }
        }
        this.loader = false;
      });
    } else if (this.children.length === 1) {
      let requestData = {
        token: this.authService.userToken,
      }
      let id = this.children[0];
      this.subscriptionSeven = this.requestService.getMethod('/activity/child/' + id, requestData).subscribe(data => {
        if (data.error === false) {
          if (data.data.length > 0) {
            this.activityTable = data.data;
            this.emptyTable = false;
          } else {
            this.emptyTable = true;
            this.activityTable = [];
          }
        }
        this.loader = false;
      });
    }
    this.checkDates();
  }

  getSingleChildActivity(child_id) {
    this.loader = true;
    let requestData = {
      token: this.authService.userToken,
    }
    let id = child_id;
    this.subscriptionEight = this.requestService.getMethod('/activity/child/' + id, requestData).subscribe(data => {
      if (data.error === false) {
        if (data.data.length > 0) {
          this.activityTable = data.data;
          this.emptyTable = false;
        } else {
          this.emptyTable = true;
          this.activityTable = [];
        }
      }
      this.loader = false;
    });
    this.checkDates();
  }

  getDifferentDayChildActivity(sign) {
    this.loader = true;
    let diff = moment().diff(this.date, 'days');
    if (diff !== 0) {
      this.count = -(diff);
    }
    if (sign === '-') {
      this.count--;
      if (this.count === 0) {
        this.getChildActivity();
        this.date = moment()['_d'];
        return true;
      }
    } else if (sign === '+') {
      this.count++;
      if (this.count === 0) {
        this.getChildActivity();
        this.date = moment()['_d'];
        return true;
      }
    }
      let date = moment().subtract(-(this.count), 'day')['_d'];
      this.date = date;
    

    if (this.children.length > 1) {
      let requestData = {
        token: this.authService.userToken,
        body: {
          'id1': this.children[0],
          'id2': this.children[1],
          'count': this.count
        }
      }
      this.subscriptionNine = this.requestService.postMethod('/activity/childs/day', requestData).subscribe(data => {
        if (data.error === false) {
          if (data.data.length > 0) {
            this.activityTable = data.data;
            this.emptyTable = false;
          } else {
            this.emptyTable = true;
            this.activityTable = [];
          }
        }
        this.loader = false;
      });
    }
    else if (this.children.length === 1) {
      let id = this.children[0];
      let requestData = {
        token: this.authService.userToken,
        body: {
          'id': id,
          'count': this.count
        }
      }
      this.subscriptionTen = this.requestService.postMethod('/activity/child/day', requestData).subscribe(data => {
        if (data.error === false) {
          if (data.data.length > 0) {
            this.activityTable = data.data;
            this.emptyTable = false;
          } else {
            this.emptyTable = true;
            this.activityTable = [];
          }
        }
        this.loader = false;
      });
    } else {
      this.emptyTable = true;
    }
    this.checkDates();
  }

  getCategoryTitle(sourceCategory) {
    switch (sourceCategory) {
      case ('breast'): {
        return this.categoriesService.categories[0].text[this.translate.getDefaultLang()];
      }
      case ('bottle'): {
        return this.categoriesService.categories[1].text[this.translate.getDefaultLang()];
      }
      case ('diaper'): {
        return this.categoriesService.categories[2].text[this.translate.getDefaultLang()];
      }
      case ('medicine'): {
        return this.categoriesService.categories[3].text[this.translate.getDefaultLang()];
      }
      case ('sleep'): {
        return this.categoriesService.categories[4].text[this.translate.getDefaultLang()];
      }
    }
  }

  getCategoryColor(sourceCategory) {
    switch (sourceCategory) {
      case ('breast'): {
        return this.categoriesService.categories[0].color;
      }
      case ('bottle'): {
        return this.categoriesService.categories[1].color;
      }
      case ('diaper'): {
        return this.categoriesService.categories[2].color;
      }
      case ('medicine'): {
        return this.categoriesService.categories[3].color;
      }
      case ('sleep'): {
        return this.categoriesService.categories[4].color;
      }
    }
  }

  getActivityInfo(sourceCategory) {
    switch (sourceCategory) {
      case ('breast'): {
        return this.categoriesService.categories[0].text[this.translate.getDefaultLang()];
      }
      case ('bottle'): {
        return this.categoriesService.categories[1].text[this.translate.getDefaultLang()];
      }
      case ('diaper'): {
        return this.categoriesService.categories[2].text[this.translate.getDefaultLang()];
      }
      case ('medicine'): {
        return this.categoriesService.categories[3].text[this.translate.getDefaultLang()];
      }
      case ('sleep'): {
        return this.categoriesService.categories[4].text[this.translate.getDefaultLang()];
      }
    }
  }

  getBreast(side_id) {
    switch (side_id) {
      case (1): {
        return "lewa";
      }
      case (2): {
        return "prawa";
      }
    }
  }

  getDiaper(type_id) {
    switch (type_id) {
      case (1): {
        return "kupka";
      }
      case (2): {
        return "siusiu";
      }
    }
  }

}