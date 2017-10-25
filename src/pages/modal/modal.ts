import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { TimerService } from "../../services/timer";
import { ChildrenService } from "../../services/children";

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  public title: string = '';
  public clock: boolean = false;
  public timeStopped: boolean = false;
  public paramData: any;
  public childSelected: number;
  public breastSelected: boolean = false;
  public breastLeft: boolean = true;
  public breastRight: boolean = false;
  public breastSide: any = [];
  public bottleSelected: boolean = false;
  public feeding: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public timerService: TimerService,
    public childrenService: ChildrenService
  ) {
  }

  ionViewDidEnter() {
    this.paramData = this.navParams.data;
    this.title = this.paramData.text;
    this.childSelected = this.childrenService.children[this.paramData.child].name;
    this.clearOption();
    this.checkModalOption(this.navParams.data.category);
    this.setNameLocation();
    console.log(this.navParams.data)
  }

  clearOption() {
    this.clock = false;
    this.breastSelected = false;
    this.bottleSelected = false;
    this.breastLeft = true;
    this.breastRight = false;
  }

  checkModalOption(option) {
    switch (option) {
      case ('breastFeeding'): {
        this.breastSelected = true;
        break;
      }
      case ('bottleFeeding'): {
        this.bottleSelected = true;
        if (this.paramData.together) {
          this.feeding = 'razem';
        } else {
          this.feeding = 'osobno';
        }
        break;
      }
    }
  }

  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  breastSelection(index) {
    if (index === 0) {
      this.breastLeft = true;
      this.breastRight = false;
      this.breastSide = ["lewa", "prawa"];
    } else {
      this.breastLeft = false;
      this.breastRight = true;
      this.breastSide = ["prawa", "lewa"];
    }
  }

  setNameLocation() {
    if (this.paramData.together) {
      if (this.paramData.child == 0) {
        this.breastSide = ["lewa", "prawa"];
      } else {
        this.breastSide = ["prawa", "lewa"];
      }
    } else {
      this.breastSide = ["lewa", "prawa"];
    }

  }

  run() {
    if (this.timerService.breastFeeding.running === true) {
      this.timeStopped = true;
      this.clock = true;
    } else {
      this.timeStopped = false;
      this.clock = false;
    }
    this.timerService.runBreastFeeding();
  }

  clear() {
    this.timeStopped = false;
    this.timerService.clearBreastFeeding()
  }

  save() {

  }

}
