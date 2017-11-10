import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ActivityPage } from "../pages/activity/activity";
import { BottleFeedingPage } from "../pages/bottle-feeding/bottle-feeding";
import { BreastFeedingPage } from "../pages/breast-feeding/breast-feeding";
import { DiaperPage } from "../pages/diaper/diaper";
import { GrowthPage } from "../pages/growth/growth";
import { MedicinePage } from "../pages/medicine/medicine";
import { SleepingPage } from "../pages/sleeping/sleeping";
import { StatisticsPage } from "../pages/statistics/statistics";
import { TimetablePage } from "../pages/timetable/timetable";
import { NewEventPage } from "../pages/new-event/new-event";
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { ReminderPage } from "../pages/reminder/reminder";
import { ModalPage } from '../pages/modal/modal';
import { StatisticModalPage } from '../pages/statistic-modal/statistic-modal';
import { ChangePasswordPage } from "../pages/change-password/change-password";
import { AddChildPage } from "../pages/add-child/add-child";
import { ChildrenPage } from "../pages/children/children";
import { EditChildPage } from "../pages/edit-child/edit-child";

import { LoaderComponent } from '../components/loader/loader';

import { TimerService } from '../services/timer';
import { CategoriesService } from '../services/categories';
import { ChildrenService } from '../services/children';
import { RequestService } from '../services/request';
import { AuthService } from '../services/auth';

import { IonicStorageModule } from '@ionic/storage';
import { DatePickerModule } from 'ionic3-datepicker';
import { Camera } from '@ionic-native/camera';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Device } from '@ionic-native/device';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ActivityPage,
    BottleFeedingPage,
    BreastFeedingPage,
    DiaperPage,
    GrowthPage,
    MedicinePage,
    SleepingPage,
    StatisticsPage,
    TimetablePage,
    ModalPage,
    NewEventPage,
    StatisticModalPage,
    LoginPage,
    RegisterPage,
    ReminderPage,
    ChangePasswordPage,
    AddChildPage,
    ChildrenPage,
    EditChildPage,
    //Components:
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    DatePickerModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ActivityPage,
    BottleFeedingPage,
    BreastFeedingPage,
    DiaperPage,
    GrowthPage,
    MedicinePage,
    SleepingPage,
    StatisticsPage,
    TimetablePage,
    ModalPage,
    NewEventPage,
    StatisticModalPage,
    LoginPage,
    RegisterPage,
    ReminderPage,
    ChangePasswordPage,
    AddChildPage,
    ChildrenPage,
    EditChildPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    BackgroundMode,
    Device,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    TimerService,
    CategoriesService,
    ChildrenService,
    RequestService,
    AuthService
  ]
})
export class AppModule { }
