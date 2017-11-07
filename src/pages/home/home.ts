import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ActivityPage } from "../activity/activity";
import { BottleFeedingPage } from "../bottle-feeding/bottle-feeding";
import { BreastFeedingPage } from "../breast-feeding/breast-feeding";
import { DiaperPage } from "../diaper/diaper";
import { GrowthPage } from "../growth/growth";
import { MedicinePage } from "../medicine/medicine";
import { SleepingPage } from "../sleeping/sleeping";
import { StatisticsPage } from "../statistics/statistics";
import { TimetablePage } from "../timetable/timetable";

import { CategoriesService } from '../../services/categories';
import { TimerService } from "../../services/timer";
import { RequestService } from "../../services/request";
import { AuthService } from '../../services/auth';
import { ChildrenService } from '../../services/children';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  activityPage = ActivityPage;
  bottleFeedingPage = BottleFeedingPage;
  breastFeedingPage = BreastFeedingPage;
  diaperPage = DiaperPage;
  growthPage = GrowthPage;
  medicinePage = MedicinePage;
  sleepingPage = SleepingPage;
  statisticsPage = StatisticsPage;
  timetablePage = TimetablePage;

  public token: string;

  constructor(
    public navCtrl: NavController,
    public categoriesService: CategoriesService,
    public timerService: TimerService,
    public requestService: RequestService,
    public childrenService: ChildrenService,
    public authService: AuthService,
    public storage: Storage
  ) {
  }

  ionViewDidEnter() {
    this.getKids();
  }

  getKids() {
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

}
