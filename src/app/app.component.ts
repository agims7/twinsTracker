import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NavController } from "ionic-angular";
import { MenuController } from "ionic-angular";

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AddChildPage } from '../pages/add-child/add-child';
import { SettingsPage } from '../pages/settings/settings';

import { TimerService } from "../services/timer";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  homePage = HomePage;
  settingsPage = SettingsPage;
  addChildPage = AddChildPage;
  rootPage: any = LoginPage;
  @ViewChild('nav') nav: NavController;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public timerService: TimerService,
    public menuCtrl: MenuController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

}

