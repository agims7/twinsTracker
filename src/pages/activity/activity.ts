import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ChildrenService } from '../../services/children';
import { RequestService } from "../../services/request";
import { AuthService } from '../../services/auth';
import { TimerService } from "../../services/timer";
import { CategoriesService } from "../../services/categories";

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
  public object = {
    monday: false,
    weekdays: ['Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'],
    months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
  };
  public today: Date = moment()['_d'];
  public minDate: Date = moment().subtract(30, 'day')['_d'];
  public children = [];
  public activityTable = [];
  public count: number = 0;
  public emptyTable: boolean = false;
  public arrowFutureDisable: boolean = true;
  public diffDay: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public requestService: RequestService,
    public childrenService: ChildrenService,
    public authService: AuthService,
    public timerService: TimerService,
    public categoriesService: CategoriesService
  ) {
    moment.locale('pl');
    this.createTable();
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
    this.choiceArray.unshift({ name: "Razem" });
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
        this.requestService.postMethod('/activity/child/day', requestData).subscribe(data => {
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
          this.requestService.postMethod('/activity/childs/day', requestData).subscribe(data => {
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
          this.requestService.postMethod('/activity/child/day', requestData).subscribe(data => {
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
      this.requestService.postMethod('/activity/childs/day', requestData).subscribe(data => {
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
      this.requestService.postMethod('/activity/child/day', requestData).subscribe(data => {
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
      this.requestService.postMethod('/activity/childs', requestData).subscribe(data => {
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
      this.requestService.getMethod('/activity/child/' + id, requestData).subscribe(data => {
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
    this.requestService.getMethod('/activity/child/' + id, requestData).subscribe(data => {
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
      this.requestService.postMethod('/activity/childs/day', requestData).subscribe(data => {
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
      this.requestService.postMethod('/activity/child/day', requestData).subscribe(data => {
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
        return this.categoriesService.categories[0].text;
      }
      case ('bottle'): {
        return this.categoriesService.categories[1].text;
      }
      case ('diaper'): {
        return this.categoriesService.categories[2].text;
      }
      case ('medicine'): {
        return this.categoriesService.categories[3].text;
      }
      case ('sleep'): {
        return this.categoriesService.categories[4].text;
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
        return this.categoriesService.categories[0].text;
      }
      case ('bottle'): {
        return this.categoriesService.categories[1].text;
      }
      case ('diaper'): {
        return this.categoriesService.categories[2].text;
      }
      case ('medicine'): {
        return this.categoriesService.categories[3].text;
      }
      case ('sleep'): {
        return this.categoriesService.categories[4].text;
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