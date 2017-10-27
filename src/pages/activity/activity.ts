import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ChildrenService } from '../../services/children';

import * as _ from 'lodash';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {
  public choiceArray: any = [];
  public choice: number = 0;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public childrenService: ChildrenService
  ) {
    this.createTable();
  }

  createTable() {
    this.choiceArray = _.clone(this.childrenService.children);
    this.choiceArray.unshift({ name: "Razem" });
  }

  makeChoice(index) {
    this.choice = index;
  }

}
