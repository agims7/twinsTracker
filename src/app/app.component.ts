import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { NavController } from "ionic-angular";
import { MenuController } from "ionic-angular";

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ChildrenPage } from '../pages/children/children';
import { AddChildPage } from '../pages/add-child/add-child';
import { SettingsPage } from '../pages/settings/settings';

import { TimerService } from "../services/timer";
import { AuthService } from "../services/auth";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  homePage = HomePage;
  childrenPage = ChildrenPage;
  settingsPage = SettingsPage;
  addChildPage = AddChildPage;
  rootPage: any = LoginPage;
  @ViewChild('nav') nav: NavController;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public timerService: TimerService,
    public menuCtrl: MenuController,
    public storage: Storage,
    public authService: AuthService
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

  onLogout() {
    // this.authService.logout();
    this.storage.keys().then((data) => {
      let keys = data;
      for (var key of keys) {
        this.storage.remove(key);
      }
      this.storage.keys()
    });
    this.authService.clear();
    this.menuCtrl.close();
    this.nav.setRoot(LoginPage);
  }

}

