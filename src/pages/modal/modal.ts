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
  public timeStopped: boolean = false;
  public paramData: any;
  public childSelectedIndex: any;
  public childSelected: number;
  public breastLeft: boolean = true;
  public breastRight: boolean = false;
  public breastSide: any = [];
  public breastSelected: boolean = false;
  public bottleSelected: boolean = false;
  public sleepingSelected: boolean = false;
  public diaperSelected: boolean = false;
  public medicineSelected: boolean = false;
  public growthSelected: boolean = false;
  public togetherOrNot: string = '';
  public running: boolean;
  public selection: number;

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
    this.childSelectedIndex = this.paramData.child;
    this.childSelected = this.childrenService.children[this.paramData.child].name;
    this.clearOption();
    this.checkModalOption(this.navParams.data.category);
    console.log(this.selection)
    this.setNameLocation();
    this.isTogether();
    console.log(this.navParams.data)
  }

  clearOption() {
    this.breastSelected = false;
    this.bottleSelected = false;
    this.sleepingSelected = false;
    this.diaperSelected = false;
    this.medicineSelected = false;
    this.growthSelected = false;
    this.breastLeft = true;
    this.breastRight = false;
    this.selection = null;
  }

  isTogether() {
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
        this.running = this.timerService.breastFeeding[0].running;
        this.selection = 0;
        break;
      }
      case ('bottleFeeding'): {
        this.bottleSelected = true;
        this.running = this.timerService.bottleFeeding[0].running;
        this.selection = 1;
        break;
      }
      case ('diaper'): {
        this.diaperSelected = true;
        this.selection = 2;
        break;
      }
      case ('medicine'): {
        this.medicineSelected = true;
        this.selection = 3;
        break;
      }
      case ('sleeping'): {
        this.sleepingSelected = true;
        this.running = this.timerService.sleeping[0].running;
        this.selection = 4;
        break;
      }
      case ('growth'): {
        this.growthSelected = true;
        this.selection = 5;
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

  run(index, type) {
    console.log('click run - index', index)
    if (type == 'together') {
      console.log('together')
      if (this.breastSelected === true) {
        this.running = this.timerService.breastFeeding[index].running;
        this.timerService.runBreastFeeding(index);
      } else if (this.bottleSelected === true) {
        this.running = this.timerService.bottleFeeding[index].running;
        this.timerService.runBottleFeeding(index);
      } else if (this.sleepingSelected === true) {
        this.running = this.timerService.sleeping[index].running;
        this.timerService.runSleeping(index);
      }
    } else {
      console.log('osobno')
      if (this.breastSelected === true) {
        this.running = this.timerService.breastFeeding[index].running;
        this.timerService.runBreastFeeding(index);
      } else if (this.bottleSelected === true) {
        this.timerService.runBottleFeeding(index);
      } else if (this.sleepingSelected === true) {
        this.timerService.runSleeping(index);
      }
    }

    if (this.running === true) {
      this.timeStopped = true;
    } else {
      this.timeStopped = false;
    }
  }

  clear(index) {
    this.timeStopped = false;
    if (this.breastSelected === true) {
      this.timerService.clearBreastFeeding(index);
      this.timerService.breastFeeding[index].running = false;
    } else if (this.bottleSelected === true) {
      this.timerService.clearBottleFeeding(index);
      this.timerService.bottleFeeding[index].running = false;
    } else if (this.sleepingSelected === true) {
      this.timerService.clearSleeping(index);
      this.timerService.sleeping[index].running = false;
    }
  }



  poo(child) {
    console.log('child', child, 'gowno', this.timerService.fecesDone, 'urine', this.timerService.urineDone)
    this.timerService.fecesDone[child] ? this.timerService.fecesDone[child] = false : this.timerService.fecesDone[child] = true;
  }

  pee(child) {
    console.log('child', child, 'gowno', this.timerService.fecesDone, 'urine', this.timerService.urineDone)
    this.timerService.urineDone[child] ? this.timerService.urineDone[child] = false : this.timerService.urineDone[child] = true;
  }

  save() {
    switch (this.selection) {
      case (0): {
        if (this.paramData.together) {
          
        } else {
          console.log(this.childSelectedIndex, this.childrenService.children)
          let childID = this.childrenService.children[0].id;
        }
        break;
      }
      case (1): {
        if (this.paramData.together) {
        } else {

        }
        break;
      }
      case (2): {
        if (this.paramData.together) {
        } else {

        }
        break;
      }
      case (3): {
        if (this.paramData.together) {
        } else {

        }
        break;
      }
      case (4): {
        if (this.paramData.together) {
        } else {

        }
        break;
      }
      case (5): {
        if (this.paramData.together) {
        } else {

        }
        break;
      }
    }
  }

}
