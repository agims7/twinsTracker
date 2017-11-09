import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';
import { EditChildPage } from '../../pages/edit-child/edit-child';

import { ChildrenService } from "../../services/children";
import { RequestService } from "../../services/request";
import { AuthService } from "../../services/auth";
import { TimerService } from "../../services/timer";

import * as moment from 'moment';

@IonicPage() @Component({
  selector: 'page-children',
  templateUrl: 'children.html',
})
export class ChildrenPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public childrenService: ChildrenService,
    public requestService: RequestService,
    public authService: AuthService,
    public timerService: TimerService
  ) {
  }

  ionViewDidLoad() {
    console.log(this.childrenService.children);
  }

  goBack() {
    this.navCtrl.setRoot(HomePage);
  }

  remove(id) {
    let requestData = {
      token: this.authService.userToken,
    }
    this.requestService.deleteMethod('/children/' + id, requestData).subscribe(data => {
      if (data.error === false) {
        console.log('Succes')
      } else {
        console.log('Error')
      }
      this.updateKids();
    });
  }

  edition(child) {
    this.navCtrl.push(EditChildPage, {
      child: child
    });
  }

  updateKids() {
    this.childrenService.children = [];
    let requestData = {
      token: this.authService.userToken
    }
    this.requestService.getMethod('/children/parrent/' + this.authService.userID, requestData).subscribe(data => {
      let kids = data.data;
      if (data.data) {
        for (var child of kids) {
          this.childrenService.children.push(child);
        }
        this.timerService.setTimerObjects();
      }
    });
  }

  showTime(time) {
    return moment(time).format('DD.MM.YYYY');
  }

}
