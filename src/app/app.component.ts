import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Device } from '@ionic-native/device';
import { Network } from '@ionic-native/network';

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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  private toastConnection: any;
  private toastDisconnection: any;
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
    public network: Network,
    public toastCtrl: ToastController,
    public timerService: TimerService,
    public menuCtrl: MenuController,
    public storage: Storage,
    public authService: AuthService,
    public requestService: RequestService
  ) {
    platform.ready().then(() => {
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        this.openDesconnectionToast();
      });
      let connectSubscription = this.network.onConnect().subscribe(() => {
        this.openConnectionToast();
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.backgroundMode.isEnabled();
      
      console.log(this.backgroundMode.isEnabled(), 'is enable??')
      this.authentication();
      this.platform.pause.subscribe(
        ()=> {
          // this.backgroundMode.enable();
          // console.log('Pause');
          // console.log(this.backgroundMode.isEnabled(), 'is enable??')
          // setInterval(() => (console.log('testttttt', new Date())), 1000);
          
        }
      );
      this.platform.resume.subscribe( ()=>{
        console.log('Resume');
      })
      console.log('Device OS is: ' + this.device.platform + ' with version: ' + this.device.version + ' and with brand: ' + this.device.manufacturer);
    });
  }

  // checkNetworkConnection() {
  //   let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
  //     alert('network was disconnected :-(');
  //     alert(this.network.type)
  //   });
  //   let connectSubscription = this.network.onConnect().subscribe(() => {
  //     alert('network connected!');
  //     alert(this.network.type)
  //   });
  // }

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

  authentication() {
    this.storage.get('userToken').then((userToken) => {
      if (userToken == null || userToken == undefined) {
        return;
      } else {
        let requestData = {
          body: {
            'token': userToken
          }
        };
        this.requestService.authMethod('/other/authcheck', requestData).subscribe(data => {
          if (data.error === false) {
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

  openDesconnectionToast() {
    this.toastDisconnection = this.toastCtrl.create({
      message: 'Brak połączenia z internetem',
      duration: 3500,
      showCloseButton: true,
      closeButtonText: 'Ok',
      cssClass: 'disconnect'
    });
    this.toastDisconnection.present();
  }

  openConnectionToast() {
    this.toastConnection = this.toastCtrl.create({
      message: 'Połączono z internetem',
      duration: 2500,
      showCloseButton: true,
      closeButtonText: 'Ok',
      cssClass: 'connect'
    });
    this.toastConnection.present();
  }

}
