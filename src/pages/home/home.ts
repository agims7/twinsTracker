import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ActivityPage } from "../activity/activity";
import { BootleFeedingPage } from "../bootle-feeding/bootle-feeding";
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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  activityPage = ActivityPage;
  bootleFeedingPage = BootleFeedingPage;
  breastFeedingPage = BreastFeedingPage;
  diaperPage = DiaperPage;
  growthPage = GrowthPage;
  medicinePage = MedicinePage;
  sleepingPage = SleepingPage;
  statisticsPage = StatisticsPage;
  timetablePage = TimetablePage;

  constructor(
    public navCtrl: NavController,
    public categoriesService: CategoriesService,
    public timerService: TimerService,
    public requestService: RequestService
  ) {
    this.timerService.setTimerObjects();
  }

  ionViewDidEnter() {
    let id = 1;
    this.requestService.getMethod('/children/parrent/' + id).subscribe(data => {
      console.log(data.data, '?????????????????????????')
    });
  }


}
