import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import { Network } from '@ionic-native/network';
import { TranslateService } from '@ngx-translate/core';

import { NavController } from "ionic-angular";
import { MenuController } from "ionic-angular";
import { ToastController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ChildrenPage } from '../pages/children/children';
import { AddChildPage } from '../pages/add-child/add-child';
import { ChangePasswordPage } from '../pages/change-password/change-password';

import { TimerService } from "../services/timer";
import { AuthService } from "../services/auth";
import { RequestService } from "../services/request";

import "rxjs/add/operator/share";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  private toastConnection: any;
  private toastDisconnection: any;
  public homePage = HomePage;
  public childrenPage = ChildrenPage;
  public changePasswordPage = ChangePasswordPage;
  public addChildPage = AddChildPage;
  public rootPage: any = LoginPage;
  public languages: any = ['pl', 'en'];
  public polishLanguages: boolean = true;
  public flag: string = "assets/images/english.png";

  @ViewChild('nav') nav: NavController;

  constructor(
    private translate: TranslateService,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public device: Device,
    public network: Network,
    public toastCtrl: ToastController,
    public timerService: TimerService,
    public menuCtrl: MenuController,
    public storage: Storage,
    public authService: AuthService,
    public requestService: RequestService
  ) {
    platform.ready().then(() => {
      this.network.onDisconnect().subscribe(() => {
        this.openDesconnectionToast();
      });

      this.network.onConnect().subscribe(() => {
        this.openConnectionToast();
      });

      statusBar.styleDefault();
      translate.setDefaultLang('pl');
      this.authentication();
      this.clearLocalStorage();

      console.log('Device OS is: ' + this.device.platform + ' with version: ' + this.device.version + ' and with brand: ' + this.device.manufacturer);
      console.log('Platform READY')
    });
  }

  switchLanguage(): void {
    this.polishLanguages = !this.polishLanguages;
    let language;

    if (this.polishLanguages) {
      language = this.languages[0];
      this.flag = "assets/images/english.png";
    } else {
      language = this.languages[1];
      this.flag = "assets/images/polish.png";
    }

    this.translate.use(language);
    this.translate.setDefaultLang(language);
    console.log(this.translate.getDefaultLang())
  }

  onLoad(page: any): void {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout(): void {
    this.storage.keys().then((data) => {
      let keys = data;

      for (const key of keys) {
        this.storage.remove(key);
      }

      this.storage.keys()
    });

    this.authService.clear();
    this.menuCtrl.close();
    this.nav.setRoot(LoginPage);
  }

  authentication() {
    this.storage.get('userToken').then((userToken) => {
      if (userToken == null || userToken == undefined) {
        return;
      } else {
        const requestData = {
          body: {
            'token': userToken
          }
        };

        this.requestService.authMethod('/other/authcheck', requestData).subscribe(data => {
          if (!data.error) {
            this.authService.userName = data.name;
            this.authService.userToken = userToken;
            this.authService.userID = data.id;
            this.authService.userEmail = data.email;
            this.authService.premium = data.premium;
            this.splashScreen.hide();
            this.nav.setRoot(HomePage);
          } else {
            this.splashScreen.hide();
            this.nav.setRoot(LoginPage);
          }
        });
      }
    });
  }

  openDesconnectionToast(): void {
    this.toastDisconnection = this.toastCtrl.create({
      message: 'Brak połączenia z internetem',
      duration: 3500,
      showCloseButton: true,
      closeButtonText: 'Ok',
      cssClass: 'disconnect'
    });
    this.toastDisconnection.present();
  }

  openConnectionToast(): void {
    this.toastConnection = this.toastCtrl.create({
      message: 'Połączono z internetem',
      duration: 2500,
      showCloseButton: true,
      closeButtonText: 'Ok',
      cssClass: 'connect'
    });
    this.toastConnection.present();
  }

  clearLocalStorage(): void {
    this.storage.ready().then(() => {
      for (let index = 0; index <= 1; index++) {
        this.storage.remove(`sleepingTime[${index}]`).then(() => {
          this.storage.remove(`sleepingStart[${index}]`).then(() => {
          });
        });

        this.storage.remove(`breastFeedingTime[${index}]`).then(() => {
          this.storage.remove(`breastFeedingStart[${index}]`).then(() => {
          });
        });

        this.storage.remove(`bottleFeedingTime[${index}]`).then(() => {
          this.storage.remove(`bottleFeedingStart[${index}]`).then(() => {
          });
        });
      }
    });
  }

}
