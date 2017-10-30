import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ActivityPage } from "../pages/activity/activity";
import { BootleFeedingPage } from "../pages/bootle-feeding/bootle-feeding";
import { BreastFeedingPage } from "../pages/breast-feeding/breast-feeding";
import { DiaperPage } from "../pages/diaper/diaper";
import { GrowthPage } from "../pages/growth/growth";
import { MedicinePage } from "../pages/medicine/medicine";
import { SleepingPage } from "../pages/sleeping/sleeping";
import { StatisticsPage } from "../pages/statistics/statistics";
import { TimetablePage } from "../pages/timetable/timetable";
import { NewEventPage } from "../pages/new-event/new-event";

import { ModalPage } from '../pages/modal/modal';

import { TimerService } from '../services/timer';
import { CategoriesService } from '../services/categories';
import { ChildrenService } from '../services/children';

import { DatePickerModule } from 'ionic3-datepicker';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ActivityPage,
    BootleFeedingPage,
    BreastFeedingPage,
    DiaperPage,
    GrowthPage,
    MedicinePage,
    SleepingPage,
    StatisticsPage,
    TimetablePage,
    ModalPage,
    NewEventPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    DatePickerModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ActivityPage,
    BootleFeedingPage,
    BreastFeedingPage,
    DiaperPage,
    GrowthPage,
    MedicinePage,
    SleepingPage,
    StatisticsPage,
    TimetablePage,
    ModalPage,
    NewEventPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    TimerService,
    CategoriesService,
    ChildrenService
  ]
})
export class AppModule { }
