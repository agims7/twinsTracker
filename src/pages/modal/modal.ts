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
  public childSelectedIndex: any;
  public childSelected: number;
  public breastSelected: boolean = false;
  public breastLeft: boolean = true;
  public breastRight: boolean = false;
  public breastSide: any = [];
  public bottleSelected: boolean = false;
  public sleepingSelected: boolean = false;
  public diaperSelected: boolean = false;
  public medicineSelected: boolean = false;
  public growthSelected: boolean = false;
  public togetherOrNot: string = '';
  public running: boolean;

  public fecesDone = [false, false];
  public urineDone = [false, false];

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
    this.childSelectedIndex = [this.paramData.child];
    this.childSelected = this.childrenService.children[this.paramData.child].name;
    this.clearOption();
    this.checkModalOption(this.navParams.data.category);
    this.setNameLocation();
    this.isTogeth();
    console.log(this.navParams.data)
  }

  clearOption() {
    this.clock = false;
    this.breastSelected = false;
    this.bottleSelected = false;
    this.sleepingSelected = false;
    this.diaperSelected = false;
    this.medicineSelected = false;
    this.growthSelected = false;
    this.breastLeft = true;
    this.breastRight = false;
    this.fecesDone = [false, false];
    this.urineDone = [false, false];
  }

  isTogeth() {
    if (this.paramData.together) {
      this.togetherOrNot = 'razem';
    } else {
      this.togetherOrNot = 'osobno';
    }
  }

  checkModalOption(option) {
    switch (option) {
      case ('breastFeeding'): {
        this.breastSelected = true;
        this.running = this.timerService.breastFeeding.running;
        break;
      }
      case ('bottleFeeding'): {
        this.bottleSelected = true;
        this.running = this.timerService.bottleFeeding.running;
        break;
      }
      case ('slipping'): {
        this.sleepingSelected = true;
        this.running = this.timerService.breastFeeding.running;
        break;
      }
      case ('diaper'): {
        this.diaperSelected = true;
        break;
      }
      case ('medicine'): {
        this.medicineSelected = true;
        break;
      }
      case ('growth'): {
        this.growthSelected = true;
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
    if (this.running === true) {
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

  poo(child) {
    console.log('child', child, 'gowno', this.fecesDone, 'urine', this.urineDone)
    this.fecesDone[child] ? this.fecesDone[child] = false : this.fecesDone[child] = true;
  }

  pee(child) {
    console.log('child', child, 'gowno', this.fecesDone, 'urine', this.urineDone)
    this.urineDone[child] ? this.urineDone[child] = false : this.urineDone[child] = true;
  }

  save() {

  }

}
