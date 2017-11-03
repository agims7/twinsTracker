import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Storage } from '@ionic/storage';

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
import { AuthService } from '../../services/auth';
import { ChildrenService } from '../../services/children';

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

  public token: string;
  public parrentId: number;

  constructor(
    public navCtrl: NavController,
    public categoriesService: CategoriesService,
    public timerService: TimerService,
    public requestService: RequestService,
    public childrenService: ChildrenService,
    public authService: AuthService,
    public storage: Storage,
    private http: HttpClient
  ) {
    this.timerService.setTimerObjects();
  }

  ionViewWillEnter() {
  }

  ionViewDidEnter() {
    this.storage.get('userToken').then((userToken) => {
      this.token = userToken;
    });
    this.storage.get('userID').then((userID) => {
      this.parrentId = userID;
      this.getKids();
    });
  }

  getKids() {
    this.childrenService.children = [];
        this.requestService.getMethod('/children/parrent/' + this.parrentId, this.token).subscribe(data => {
          console.log(data, '?????????????????????????')
          let kids = data.data;
          for (var child of kids) {
            console.log(child)
            this.childrenService.children.push(child);
          }
        });
  }

}
