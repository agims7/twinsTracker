import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Device } from '@ionic-native/device';

import { NavController } from "ionic-angular";
import { MenuController } from "ionic-angular";

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ChildrenPage } from '../pages/children/children';
import { AddChildPage } from '../pages/add-child/add-child';
import { ChangePasswordPage } from '../pages/change-password/change-password';

import { TimerService } from "../services/timer";
import { AuthService } from "../services/auth";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  homePage = HomePage;
  childrenPage = ChildrenPage;
  changePasswordPage = ChangePasswordPage;
  addChildPage = AddChildPage;
  rootPage: any = LoginPage;
  @ViewChild('nav') nav: NavController;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public backgroundMode: BackgroundMode,
    public device: Device,
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
      this.backgroundMode.enable();
      console.log('Device OS is: ' + this.device.platform + ' with version: ' + this.device.version + ' and with brand: ' + this.device.manufacturer);
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
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

