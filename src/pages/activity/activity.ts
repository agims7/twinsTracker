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
  public choiceArray: any[] = [];
  public choice: number = 0;
  public date: Date = moment()['_d'];
  public today: Date = moment()['_d'];
  public minDate: Date = moment().subtract(30, 'day')['_d'];
  public children: any[] = [];
  public activityTable: any[] = [];
  public count: number = 0;
  public emptyTable: boolean = false;
  public arrowFutureDisable: boolean = true;
  public diffDay: boolean = true;
  public togetherText: any = {
    pl: "Razem",
    en: "Together"
  };
  public cancelText: any = {
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

  ionViewDidLeave(): void {
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

  ionViewDidEnter(): void {
    this.clear();
    this.showTime(this.date);
    this.children = [];
    this.activityTable = [];
    this.getChildActivity();
  }

  clear(): void {
    this.count = 0;
    this.loader = true;
  }

  createTable(): void {
    this.choiceArray = _.clone(this.childrenService.children);
    this.choiceArray.unshift({ name: this.togetherText[this.translate.getDefaultLang()] });
  }

  makeChoice(index: number): void {
    this.choice = index;
    const child_id = this.choiceArray[this.choice].id;
    this.checkDates();

    if (child_id) {
      if (!this.diffDay) {
        this.getSingleChildActivity(child_id);
      } else {
        const diff = moment().diff(this.date, 'days');
        this.date = moment().subtract(diff, 'day')['_d'];
        const id = child_id;
        const requestData = {
          token: this.authService.userToken,
          body: {
            'id': id,
            'count': -(diff)
          }
        };

        this.subscriptionOne = this.requestService.postMethod('/activity/child/day', requestData).subscribe(data => {
          if (!data.error) {
            if (data.data.length) {
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
        const diff = moment().diff(this.date, 'days');
        this.date = moment().subtract(diff, 'day')['_d'];

        if (1 < this.children.length ) {
          const requestData = {
            token: this.authService.userToken,
            body: {
              'id1': this.children[0],
              'id2': this.children[1],
              'count': -(diff)
            }
          };

          this.subscriptionTwo = this.requestService.postMethod('/activity/childs/day', requestData).subscribe(data => {
            if (!data.error) {
              if (data.data.length) {
                this.activityTable = data.data;
                this.emptyTable = false;
              } else {
                this.emptyTable = true;
                this.activityTable = [];
              }
            }
          });
        }
        else if (1 === this.children.length) {
          let id = this.children[0];
          const requestData = {
            token: this.authService.userToken,
            body: {
              'id': id,
              'count': -(diff)
            }
          }
          this.subscriptionThree = this.requestService.postMethod('/activity/child/day', requestData).subscribe(data => {
            if (!data.error) {
              if (data.data.length) {
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
    for (const child of this.childrenService.children) {
      this.children.push(child.id)
    }

    if (1 < this.children.length ) {
      const requestData = {
        token: this.authService.userToken,
        body: {
          'id1': this.children[0],
          'id2': this.children[1],
          'count': -(diff)
        }
      }
      this.subscriptionFour = this.requestService.postMethod('/activity/childs/day', requestData).subscribe(data => {
        if (!data.error) {
          if (data.data.length) {
            this.activityTable = data.data;
            this.emptyTable = false;
          } else {
            this.emptyTable = true;
            this.activityTable = [];
          }
        }
      });
    }
    else if (1 === this.children.length) {
      const id = this.children[0];
      const requestData = {
        token: this.authService.userToken,
        body: {
          'id': id,
          'count': -(diff)
        }
      };

      this.subscriptionFive = this.requestService.postMethod('/activity/child/day', requestData).subscribe(data => {
        if (!data.error) {
          if (data.data.length) {
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

  showTime(time: any): any {
    return moment(time).format('dddd DD.MM');
  }

  showDayTime(time: any): any {
    return moment(time).format('HH:mm');
  }

  getChildActivity(): void {
    this.loader = true;
    this.date = moment()['_d'];
    this.children = [];

    for (const child of this.childrenService.children) {
      this.children.push(child.id)
    }

    if (1 < this.children.length ) {
      const requestData = {
        token: this.authService.userToken,
        body: {
          'id1': this.children[0],
          'id2': this.children[1]
        }
      };

      this.subscriptionSix = this.requestService.postMethod('/activity/childs', requestData).subscribe(data => {
        if (!data.error) {
          if (data.data.length) {
            this.activityTable = data.data;
            this.emptyTable = false;
          } else {
            this.emptyTable = true;
            this.activityTable = [];
          }
        }

        this.loader = false;
      });
    } else if (1 === this.children.length) {
      const requestData = {
        token: this.authService.userToken,
      };
      const id = this.children[0];

      this.subscriptionSeven = this.requestService.getMethod('/activity/child/' + id, requestData).subscribe(data => {
        if (!data.error) {
          if (data.data.length) {
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

  getSingleChildActivity(child_id: number): void {
    this.loader = true;
    const requestData = {
      token: this.authService.userToken,
    };
    const id = child_id;

    this.subscriptionEight = this.requestService.getMethod('/activity/child/' + id, requestData).subscribe(data => {
      if (!data.error) {
        if (data.data.length) {
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

  getDifferentDayChildActivity(sign: string): any {
    this.loader = true;
    const diff = moment().diff(this.date, 'days');

    if (0 !== diff) {
      this.count = -(diff);
    }

    if ('-' === sign) {
      this.count--;

      if (0 === this.count) {
        this.getChildActivity();
        this.date = moment()['_d'];
        return true;
      }
    } else if ('+' === sign) {
      this.count++;

      if (0 === this.count) {
        this.getChildActivity();
        this.date = moment()['_d'];
        return true;
      }
    }

    const date = moment().subtract(-(this.count), 'day')['_d'];
    this.date = date;

    if (1 < this.children.length) {
      const requestData = {
        token: this.authService.userToken,
        body: {
          'id1': this.children[0],
          'id2': this.children[1],
          'count': this.count
        }
      };

      this.subscriptionNine = this.requestService.postMethod('/activity/childs/day', requestData).subscribe(data => {
        if (!data.error) {
          if (data.data.length) {
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
    else if (1 === this.children.length) {
      const id = this.children[0];
      const requestData = {
        token: this.authService.userToken,
        body: {
          'id': id,
          'count': this.count
        }
      };

      this.subscriptionTen = this.requestService.postMethod('/activity/child/day', requestData).subscribe(data => {
        if (!data.error) {
          if (data.data.length) {
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

  getCategoryTitle(sourceCategory: string): string {
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

  getCategoryColor(sourceCategory: string): string {
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

  getActivityInfo(sourceCategory: string): string {
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

  getBreast(side_id: number): string {
    switch (side_id) {
      case (1): {
        return "lewa";
      }
      case (2): {
        return "prawa";
      }
    }
  }

  getDiaper(type_id: number): string {
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