import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { RequestService } from "../../services/request";
import { AuthService } from '../../services/auth';

@IonicPage() 
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  public oldPassword: string = null;
  public newPassword: string = null;
  public newPasswordRewritten: string = null;
  public passwordMatch: boolean = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService,
    public requestService: RequestService
  ) {
  }
  
  change() {
    if (this.newPassword === this.newPasswordRewritten) {
      this.passwordMatch = true;
      let requestData = {
        token: this.authService.userToken,
        body: {
          'id': this.authService.userID,
          'oldPassword': this.oldPassword,
          'newPassword': this.newPassword
        }
      }
      this.requestService.postMethod('/users/password' , requestData).subscribe(data => {
          console.log(data)
      });
    } else {
      this.passwordMatch = false
    }
  }

  goBack() {
    this.navCtrl.setRoot(HomePage);
  }


}
