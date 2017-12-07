import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TimerService } from "../../services/timer";
import { ChildrenService } from "../../services/children";
import { RequestService } from "../../services/request";
import { AuthService } from "../../services/auth";
import { AppService } from '../../services/app';

import { Subscription } from 'rxjs/Subscription';

@IonicPage() @Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  public loader: boolean = true;
  public title: string = '';
  public timeStopped: boolean = false;
  public paramData: any;
  public childSelectedIndex: any;
  public childSelected: number;
  public breastLeft: boolean = true;
  public breastRight: boolean = false;
  public breastSide: any = [];
  public volume = [];
  public medicine: string;
  public portion: string;
  public weight: number;
  public length: number;
  public comment: string = '';
  public breastSelected: boolean = false;
  public bottleSelected: boolean = false;
  public sleepingSelected: boolean = false;
  public diaperSelected: boolean = false;
  public medicineSelected: boolean = false;
  public growthSelected: boolean = false;
  public togetherOrNot: string = '';
  public running: boolean;
  public selection: number;

  public subscriptionOne: Subscription;
  public subscriptionTwo: Subscription;
  public subscriptionThree: Subscription;
  public subscriptionFour: Subscription;
  public subscriptionFive: Subscription;
  public subscriptionSix: Subscription;
  public subscriptionSeven: Subscription;
  public subscriptionEight: Subscription;
  public subscriptionNine: Subscription;
  public subscriptionTen: Subscription;
  public subscriptionEleven: Subscription;
  public subscriptionTwelve: Subscription;
  public subscriptionThirteen: Subscription;

  constructor(
    private appService: AppService,
    public platform: Platform,
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public timerService: TimerService,
    public childrenService: ChildrenService,
    public requestService: RequestService,
    public authService: AuthService
  ) {
  }

  ionViewDidLeave() {
    this.appService.safeUnsubscribe(this.subscriptionOne);
    this.appService.safeUnsubscribe(this.subscriptionTwo);
    this.appService.safeUnsubscribe(this.subscriptionThree);
    this.appService.safeUnsubscribe(this.subscriptionFour);
    this.appService.safeUnsubscribe(this.subscriptionFive);
    this.appService.safeUnsubscribe(this.subscriptionSix);
    this.appService.safeUnsubscribe(this.subscriptionSeven);
    this.appService.safeUnsubscribe(this.subscriptionEight);
    this.appService.safeUnsubscribe(this.subscriptionNine);
    this.appService.safeUnsubscribe(this.subscriptionTen);
    this.appService.safeUnsubscribe(this.subscriptionEleven);
    this.appService.safeUnsubscribe(this.subscriptionTwelve);
    this.appService.safeUnsubscribe(this.subscriptionThirteen);
  }

  ionViewDidEnter() {
    this.paramData = this.navParams.data;
    this.title = this.paramData.text;
    this.childSelectedIndex = this.paramData.child;
    this.childSelected = this.childrenService.children[this.paramData.child].name;
    this.clearOption();
    this.checkModalOption(this.navParams.data.category);
    this.setNameLocation();
    this.isTogether();
    this.setBottleVolumes();
    this.loader = false;
    // console.log(this.navParams.data)
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
    this.volume = [];
    this.timerService.setDiaper();
    this.medicine = null;
    this.portion = null;
    this.weight = null;
    this.length = null;
    this.loader = true;
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
      if (this.paramData.child == 0) {
        this.breastSide = ["lewa", "prawa"];
      } else {
        this.breastSide = ["prawa", "lewa"];
      }
    } else {
      this.breastLeft = false;
      this.breastRight = true;
      if (this.paramData.child == 0) {
        this.breastSide = ["prawa", "lewa"];
      } else {
        this.breastSide = ["lewa", "prawa"];
      }
    }
  }

  setBottleVolumes() {
    for (let child in this.childrenService.children) {
      this.volume.push(null);
    }
  }

  setNameLocation() {
    if (this.paramData.child == 0) {
      this.breastSide = ["lewa", "prawa"];
    } else {
      this.breastSide = ["prawa", "lewa"];
    }
  }

  run(index, type) {
    console.log('click run - index', index)
    if (type == 'together') {
      if (this.breastSelected === true) {
        this.running = this.timerService.breastFeeding[index].running;
        this.timerService.runBreastFeeding(index);
        console.log('breast together')
      } else if (this.bottleSelected === true) {
        this.running = this.timerService.bottleFeeding[index].running;
        console.log('bottle together')
        this.timerService.runBottleFeeding(index);
      } else if (this.sleepingSelected === true) {
        this.running = this.timerService.sleeping[index].running;
        this.timerService.runSleeping(index);
        console.log('sleeping together')
      }
    } else {
      if (this.breastSelected === true) {
        this.running = this.timerService.breastFeeding[index].running;
        this.timerService.runBreastFeeding(index);
      } else if (this.bottleSelected === true) {
        this.running = this.timerService.bottleFeeding[index].running;
        this.timerService.runBottleFeeding(index);
      } else if (this.sleepingSelected === true) {
        console.log('sleeping not together')
        this.running = this.timerService.sleeping[index].running;
        this.timerService.runSleeping(index);
      }
    }
    // console.log('this.running', this.running)
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
    this.timerService.fecesDone[child] ? this.timerService.fecesDone[child] = false : this.timerService.fecesDone[child] = true;
    if (this.timerService.fecesDone[child] || this.timerService.urineDone[child]) {
      this.timeStopped = true;
    } else {
      this.timeStopped = false;
    }
  }

  pee(child) {
    this.timerService.urineDone[child] ? this.timerService.urineDone[child] = false : this.timerService.urineDone[child] = true;
    if (this.timerService.fecesDone[child] || this.timerService.urineDone[child]) {
      this.timeStopped = true;
    } else {
      this.timeStopped = false;
    }
  }

  getBreastSide(side) {
    switch (side) {
      case ('lewa'): {
        return 1;
      }
      case ('prawa'): {
        return 2;
      }
    }
  }

  setMedicines() {
    if (this.medicine && this.portion) {
      this.timeStopped = true;
    } else {
      this.timeStopped = false;
    }
  }

  setGrowths() {
    if (this.weight && this.length) {
      this.timeStopped = true;
    } else {
      this.timeStopped = false;
    }
  }

  getTime(childindex) {
    switch (this.selection) {
      case (0): {
        return this.timerService.breastFeeding[childindex].time;
      }
      case (1): {
        return this.timerService.bottleFeeding[childindex].time;
      }
      case (4): {
        return this.timerService.sleeping[childindex].time;
      }
    }
  }

  save() {
    this.loader = true;
    switch (this.selection) {
      case (0): {
        if (this.paramData.together) {
          let count = 0;
          for (var child of this.childrenService.children) {
            console.log('petla start ', count)
            let childID = child.id;
            let sideID = this.getBreastSide(this.breastSide[count]);
            let time = this.getTime(count);
            let requestData = {
              token: this.authService.userToken,
              body: {
                'child_id': childID,
                'side_id': sideID,
                'time': time,
                'comment': this.comment
              }
            }
            this.subscriptionOne = this.requestService.postMethod('/breast/', requestData).subscribe(data => {
              if (data.error === false) {
                console.log('Succes')
              } else {
                console.log('Error')
              }
              this.loader = false;
              console.log('przed clearem ', count)
            });
            this.clear(count);
            count++;
          }
          this.navCtrl.pop();
        } else {
          let childID = this.childrenService.children[this.childSelectedIndex].id;
          let sideID = this.getBreastSide(this.breastSide[this.childSelectedIndex]);
          let time = this.getTime(this.childSelectedIndex);
          let requestData = {
            token: this.authService.userToken,
            body: {
              'child_id': childID,
              'side_id': sideID,
              'time': time,
              'comment': this.comment
            }
          }
          this.subscriptionTwo = this.requestService.postMethod('/breast/', requestData).subscribe(data => {
            if (data.error === false) {
              console.log('Succes')
            } else {
              console.log('Error')
            }
            this.loader = false;
            this.clear(this.childSelectedIndex);
            this.navCtrl.pop();
          });
        }
        break;
      }
      case (1): {
        if (this.paramData.together) {
          let count = 0;
          for (var child of this.childrenService.children) {
            let childID = child.id;
            let volume = Number(this.volume[count]);
            let time = this.getTime(count);
            let requestData = {
              token: this.authService.userToken,
              body: {
                'child_id': childID,
                'volume': volume,
                'time': time,
                'comment': this.comment
              }
            }
            this.subscriptionThree = this.requestService.postMethod('/bottle/', requestData).subscribe(data => {
              if (data.error === false) {
                console.log('Succes')
              } else {
                console.log('Error')
              }
              this.loader = false;
            });
            this.clear(count);
            count++;
          }
          this.navCtrl.pop();
        } else {
          let childID = this.childrenService.children[this.childSelectedIndex].id;
          let volume = Number(this.volume[this.childSelectedIndex]);
          let time = this.getTime(this.childSelectedIndex);
          let requestData = {
            token: this.authService.userToken,
            body: {
              'child_id': childID,
              'volume': volume,
              'time': time,
              'comment': this.comment
            }
          }
          this.subscriptionFour = this.requestService.postMethod('/bottle', requestData).subscribe(data => {
            if (data.error === false) {
              console.log('Succes')
            } else {
              console.log('Error')
            }
            this.loader = false;
            this.clear(this.childSelectedIndex);
            this.navCtrl.pop();
          });
        }
        break;
      }
      case (2): {
        if (this.paramData.together) {
          let count = 0;
          for (var child of this.childrenService.children) {
            let childID = child.id;
            let type_id;
            if (this.timerService.fecesDone[count]) {
              type_id = 1;
              let requestData = {
                token: this.authService.userToken,
                body: {
                  'child_id': childID,
                  'type_id': type_id,
                  'comment': this.comment
                }
              }
              this.subscriptionFive = this.requestService.postMethod('/diaper/', requestData).subscribe(data => {
                if (data.error === false) {
                  console.log('Succes')
                } else {
                  console.log('Error')
                }
                this.loader = false;
              });
            }
            if (this.timerService.urineDone[count]) {
              type_id = 2;
              let requestData = {
                token: this.authService.userToken,
                body: {
                  'child_id': childID,
                  'type_id': type_id,
                  'comment': this.comment
                }
              }
              this.subscriptionSix = this.requestService.postMethod('/diaper/', requestData).subscribe(data => {
                if (data.error === false) {
                  console.log('Succes')
                } else {
                  console.log('Error')
                }
                this.loader = false;
              });
            }
            count++;
          }
          this.navCtrl.pop();
        } else {
          let childID = this.childrenService.children[this.childSelectedIndex].id;
          let type_id;
          if (this.timerService.fecesDone[this.childSelectedIndex]) {
            let type_id = 1;
            let requestData = {
              token: this.authService.userToken,
              body: {
                'child_id': childID,
                'type_id': type_id,
                'comment': this.comment
              }
            }
            this.subscriptionSeven = this.requestService.postMethod('/diaper/', requestData).subscribe(data => {
              if (data.error === false) {
                console.log('Succes')
              } else {
                console.log('Error')
              }
              this.loader = false;
              this.clear(this.childSelectedIndex);
            });
          }
          if (this.timerService.urineDone[this.childSelectedIndex]) {
            let type_id = 2;
            let requestData = {
              token: this.authService.userToken,
              body: {
                'child_id': childID,
                'type_id': type_id,
                'comment': this.comment
              }
            }
            this.subscriptionEight = this.requestService.postMethod('/diaper/', requestData).subscribe(data => {
              if (data.error === false) {
                console.log('Succes')
              } else {
                console.log('Error')
              }
              this.loader = false;
              this.clear(this.childSelectedIndex);
            });
          }
          this.navCtrl.pop();
        }
        break;
      }
      case (3): {
        if (this.paramData.together) {
          for (var child of this.childrenService.children) {
            let childID = child.id;
            let medicine = this.medicine;
            let portion = this.portion
            let requestData = {
              token: this.authService.userToken,
              body: {
                'child_id': childID,
                'medicine': medicine,
                'portion': portion,
                'comment': this.comment
              }
            }
            this.subscriptionNine = this.requestService.postMethod('/medicine/', requestData).subscribe(data => {
              if (data.error === false) {
                console.log('Succes')
              } else {
                console.log('Error')
              }
              this.loader = false;
            });
          }
          this.navCtrl.pop();
        } else {
          let childID = this.childrenService.children[this.childSelectedIndex].id;
          let medicine = this.medicine;
          let portion = this.portion
          let requestData = {
            token: this.authService.userToken,
            body: {
              'child_id': childID,
              'medicine': medicine,
              'portion': portion,
              'comment': this.comment
            }
          }
          this.subscriptionTen = this.requestService.postMethod('/medicine/', requestData).subscribe(data => {
            if (data.error === false) {
              console.log('Succes')
            } else {
              console.log('Error')
            }
            this.loader = false;
          });
          this.navCtrl.pop();
        }
        break;
      }
      case (4): {
        if (this.paramData.together) {
          let count = 0;
          for (var child of this.childrenService.children) {
            let childID = child.id;
            let time = this.getTime(count);
            let requestData = {
              token: this.authService.userToken,
              body: {
                'child_id': childID,
                'time': time,
                'comment': this.comment
              }
            }
            this.subscriptionEleven = this.requestService.postMethod('/sleep/', requestData).subscribe(data => {
              if (data.error === false) {
                console.log('Succes')
              } else {
                console.log('Error')
              }
              this.loader = false;
            });
            this.clear(count);
            count++;
          }
          this.navCtrl.pop();
        } else {
          let childID = this.childrenService.children[this.childSelectedIndex].id;
          let time = this.getTime(this.childSelectedIndex);
          let requestData = {
            token: this.authService.userToken,
            body: {
              'child_id': childID,
              'time': time,
              'comment': this.comment
            }
          }
          this.subscriptionTwelve = this.requestService.postMethod('/sleep/', requestData).subscribe(data => {
            if (data.error === false) {
              console.log('Succes')
            } else {
              console.log('Error')
            }
            this.loader = false;
            this.clear(this.childSelectedIndex);
            this.navCtrl.pop();
          });
        }
        break;
      }
      case (5): {
        if (this.paramData.together) {
          // empty
        } else {
          let childID = this.childrenService.children[this.childSelectedIndex].id;
          let weight = this.weight;
          let length = this.length;
          let requestData = {
            token: this.authService.userToken,
            body: {
              'child_id': childID,
              'weight': weight,
              'length': length,
              'comment': this.comment
            }
          }
          this.subscriptionThirteen = this.requestService.postMethod('/growth/', requestData).subscribe(data => {
            if (data.error === false) {
              console.log('Succes')
            } else {
              console.log('Error')
            }
            this.loader = false;
            this.clear(this.childSelectedIndex);
            this.navCtrl.pop();
          });
        }
        break;
      }
    }
  }

}
