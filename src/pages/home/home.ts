import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TranslateService } from '@ngx-translate/core';

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
import { AppService } from '../../services/app';

import { Subscription } from 'rxjs/Subscription';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public loader: boolean = true;
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

  public subscriptionOne: Subscription;

  constructor(
    private translate: TranslateService,
    private appService: AppService,
    public navCtrl: NavController,
    public categoriesService: CategoriesService,
    public timerService: TimerService,
    public requestService: RequestService,
    public childrenService: ChildrenService,
    public authService: AuthService,
    public storage: Storage,
    public network: Network
  ) {
  }

  ionViewDidLeave() {
    this.appService.safeUnsubscribe(this.subscriptionOne);
  }

  ionViewDidEnter() {
    this.getKids();
  }

  getKids() {
    this.childrenService.children = [];
    const requestData = {
      token: this.authService.userToken
    }
    this.subscriptionOne = this.requestService.getMethod('/children/parrent/' + this.authService.userID, requestData).subscribe(data => {
      let kids = data.data;
      if (data.data) {
        for (const child of kids) {
          this.childrenService.children.push(child);
        }
        this.loader = false;
      } else {
        this.loader = false;
      }
      this.timerService.setTimerObjects();
    });
  }  

}
