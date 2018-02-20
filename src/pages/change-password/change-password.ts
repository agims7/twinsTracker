import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { RequestService } from "../../services/request";
import { AuthService } from '../../services/auth';
import { AppService } from '../../services/app';

import { Subscription } from 'rxjs/Subscription';

@IonicPage() 
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  public loader: boolean = true;
  public oldPassword: string = null;
  public newPassword: string = null;
  public newPasswordRewritten: string = null;
  public passwordMatch: boolean = true;

  public subscriptionOne: Subscription;

  constructor(
    private appService: AppService,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService,
    public requestService: RequestService
  ) {
  }
  
  ionViewDidLeave(): void {
    this.appService.safeUnsubscribe(this.subscriptionOne);
  }

  ionViewDidEnter(): void {
    this.loader = false;
  }
  
  change(): void {
    this.loader = true;
    if (this.newPassword === this.newPasswordRewritten) {
      this.passwordMatch = true;
      const requestData = {
        token: this.authService.userToken,
        body: {
          'id': this.authService.userID,
          'oldPassword': this.oldPassword,
          'newPassword': this.newPassword
        }
      }
      this.subscriptionOne = this.requestService.postMethod('/users/password' , requestData).subscribe(data => {
          console.log(data)
          this.loader = false;
      });
    } else {
      this.passwordMatch = false
      this.loader = false;
    }
  }

  goBack(): void {
    this.navCtrl.setRoot(HomePage);
  }


}
