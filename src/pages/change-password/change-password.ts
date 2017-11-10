import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';


@IonicPage() 
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  goBack() {
    this.navCtrl.setRoot(HomePage);
  }

}
