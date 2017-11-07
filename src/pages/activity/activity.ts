import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ChildrenService } from '../../services/children';
import { RequestService } from "../../services/request";
import { AuthService } from '../../services/auth';
import { TimerService } from "../../services/timer";
import { CategoriesService } from "../../services/categories";

import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {
  public choiceArray: any = [];
  public choice: number = 0;

  public date: Date = moment()['_d'];
  public object = {
    monday: false,
    weekdays: ['Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'],
    months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
  };
  public children = [];
  public activityTable = [];
  public previousCount: number = 0;
  public futureCount: number = 0;

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
    this.previousCount = 0;
    this.futureCount = 0;
  }

  createTable() {
    this.choiceArray = _.clone(this.childrenService.children);
    this.choiceArray.unshift({ name: "Razem" });
  }

  makeChoice(index) {
    this.choice = index;
    let child_id = this.choiceArray[this.choice].id;
    if (child_id) {
      this.getSingleChildActivity(child_id);
    } else {
      this.getChildActivity();
    }
  }

  setDate(date: Date) {
    this.date = date;
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
        this.activityTable = data.data;
        console.log(data.data)
      });
    } else if (this.children.length === 1) {
      let requestData = {
        token: this.authService.userToken,
      }
      let id = this.children[0];
      this.requestService.getMethod('/activity/child/' + id, requestData).subscribe(data => {
        this.activityTable = data.data;
        console.log(data.data)
      });
    }
  }

  getSingleChildActivity(child_id) {
    let requestData = {
      token: this.authService.userToken,
    }
    let id = child_id;
    this.requestService.getMethod('/activity/child/' + id, requestData).subscribe(data => {
      this.activityTable = data.data;
      console.log(data.data)
    });
  }

  getPreviousChildActivity() {
    this.previousCount++;
    console.log(this.previousCount);
    let date = moment().subtract(1, 'day')['_d'];
    console.log(date)
    // date = moment(date).format('DD.MM.YYYY')

    // if (this.children.length > 1) {
    //   let requestData = {
    //     token: this.authService.userToken,
    //     body: {
    //       'id1': this.children[0],
    //       'id2': this.children[1],
    //       'date': date
    //     }
    //   }
    //   this.requestService.postMethod('/activity/childs/day', requestData).subscribe(data => {
    //     // this.activityTable = data.data;
    //     console.log(data)
    //   });
    // } 
    // else if (this.children.length === 1) {
    //   let requestData = {
    //     token: this.authService.userToken,
    //   }
    //   let id = this.children[0];
    //   this.requestService.getMethod('/activity/child/day' + id, requestData).subscribe(data => {
    //     this.activityTable = data.data;
    //   });
    // }
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