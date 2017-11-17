import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { RequestService } from "../../services/request";
import { ChildrenService } from '../../services/children';
import { AuthService } from "../../services/auth";

import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-edit-activity',
  templateUrl: 'edit-activity.html',
})
export class EditActivityPage {
  public loader: boolean = true;
  public data: any;
  public childPhoto: string;
  public childName: string;
  public childId: any;
  public childrenNames: any = [];
  public activityDate: Date;
  public activityId: any;
  public comment: string;
  public type: string;
  // other
  public time: number;
  public breastSide: any;
  public volume: number;
  public diaperType: any;
  public medicine: string;
  public portion: string;
  public length: number;
  public weight: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public childrenService: ChildrenService,
    public requestService: RequestService,
    public authService: AuthService,
    public alertCtrl: AlertController
  ) {
  }

  ionViewWillEnter() {
    this.clear();
    this.data = this.navParams.get('data');
    this.type = this.navParams.get('type');
    this.setProperties();
    this.setChildrenButtons();
    console.log(this.data, this.type, this.childrenService.children)
    this.loader = false;
  }

  clear() {
    this.childrenNames = [];
  }

  remove() {
    let confirm = this.alertCtrl.create({
      title: 'Czy na pewno chcesz to usunać?',
      buttons: [
        {
          text: 'Nie',
          handler: () => {
            console.log('Do nothing')
          }
        },
        {
          text: 'Tak',
          handler: () => {
            let options = {
              headers: new HttpHeaders().set('x-access-token', this.authService.userToken),
              params: new HttpParams().set('id', this.activityId).set('child_id', this.childId)
            }
            this.requestService.deleteMethod('/' + this.type + '/', options).subscribe(data => {
              console.log(data);
              if (data.error === false) {
                console.log('Succes')
                this.loader = false;
                this.navCtrl.pop();
              } else {
                console.log('Error')
                this.loader = false;
                this.navCtrl.pop();
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }

  save() {
    let requestData = this.setRequestData();
    this.requestService.putMethod('/' + this.type + '/', requestData).subscribe(data => {
      if (data.error === false) {
        console.log('Succes')
      } else {
        console.log('Error')
      }
      this.loader = false;
      this.navCtrl.pop();
    });
  }

setRequestData() {
  switch (this.type) {
    case ('breast'): {
      return {
        token: this.authService.userToken,
        body: {
          'id': this.activityId,
          'child_id': this.childId,
          'date': this.activityDate,
          'side_id': this.getBreastSideBack(this.breastSide),
          'time': this.time,
          'comment': this.comment,
        }
      }
    }
    case ('bottle'): {
      return {
        token: this.authService.userToken,
        body: {
          'id': this.activityId,
          'child_id': this.childId,
          'date': this.activityDate,
          'volume': this.volume,
          'time': this.time,
          'comment': this.comment,
        }
      }
    }
    case ('diaper'): {
      return {
        token: this.authService.userToken,
        body: {
          'id': this.activityId,
          'child_id': this.childId,
          'date': this.activityDate,
          'type_id': this.getDiaperTypeBack(this.diaperType),
          'comment': this.comment,
        }
      }
    }
    case ('medicine'): {
      return {
        token: this.authService.userToken,
        body: {
          'id': this.activityId,
          'child_id': this.childId,
          'date': this.activityDate,
          'medicine': this.medicine,
          'portion': this.portion,
          'comment': this.comment,
        }
      }
    }
    case ('sleep'): {
      return {
        token: this.authService.userToken,
        body: {
          'id': this.activityId,
          'child_id': this.childId,
          'date': this.activityDate,
          'time': this.time,
          'comment': this.comment,
        }
      }
    }
    case ('growth'): {
      return {
        token: this.authService.userToken,
        body: {
          'id': this.activityId,
          'child_id': this.childId,
          'date': this.activityDate,
          'weight': this.weight,
          'length': this.length,
          'comment': this.comment,
        }
      }
    }
  }
}

  changeName() {
    let nameAlert = this.alertCtrl.create({
      title: 'Wybierz dziecko:',
      buttons: this.childrenNames
    });
    nameAlert.present();
  }

  changeBreast() {
    let breastAlert = this.alertCtrl.create({
      title: 'Wybierz pierś:',
      buttons: [
        {
          text: 'lewa',
          handler: () => {
            this.breastSide = 'lewa';
            console.log(this.breastSide)
          }
        },
        {
          text: 'prawa',
          handler: () => {
            this.breastSide = 'prawa';
            console.log(this.breastSide)
          }
        }
      ]
    });
    breastAlert.present();
  }

  changeDiaper() {
    let diaperAlert = this.alertCtrl.create({
      title: 'Wybierz rodzaj:',
      buttons: [
        {
          text: 'kupka',
          handler: () => {
            this.diaperType = 'kupka';
            console.log(this.diaperType)
          }
        },
        {
          text: 'sisiu',
          handler: () => {
            this.diaperType = 'sisiu';
            console.log(this.diaperType)
          }
        }
      ]
    });
    diaperAlert.present();
  }

  setProperties() {
    this.childPhoto = this.data.photo;
    this.childId = this.data.child_id;
    this.childName = this.childrenService.getChildNameFromId(this.data.child_id);
    this.comment = this.data.comment;
    this.activityDate = this.data.date;
    this.activityId = this.data.id;
    this.time = this.data.time;
    this.breastSide = this.getBreastSide(this.data.side_id);
    this.volume = this.data.volume;
    this.diaperType = this.getDiaperType(this.data.type_id);
    this.medicine = this.data.medicine;
    this.portion = this.data.portion;
    this.length = this.data.length;
    this.weight = this.data.weight;
  }

  setChildrenButtons() {
    for (const child of this.childrenService.children) {
      this.childrenNames.push(
        {
          text: child.name,
          handler: () => {
            this.childName = child.name;
            this.childId = child.id;
            console.log(this.childName, this.childId)
          }
        }
      )
    }
  }

  getBreastSide(side) {
    switch (side) {
      case (1): {
        return "lewa";
      }
      case (2): {
        return "prawa";
      }
    }
  }

  getBreastSideBack(side) {
    switch (side) {
      case ('lewa'): {
        return 1;
      }
      case ('prawa'): {
        return 2;
      }
    }
  }

  getDiaperType(type) {
    switch (type) {
      case (1): {
        return "kupka";
      }
      case (2): {
        return "siusiu";
      }
    }
  }

  getDiaperTypeBack(type) {
    switch (type) {
      case ('kupka'): {
        return 1;
      }
      case ('siusiu'): {
        return 2;
      }
    }
  }

  showTime(time) {
    return moment(time).format('DD.MM.YYYY');
  }

  goBack() {
    this.navCtrl.pop();
  }

}
