import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { Camera, CameraOptions } from '@ionic-native/camera';

import { HomePage } from '../../pages/home/home';

import { RequestService } from "../../services/request";
import { ChildrenService } from '../../services/children';
import { AuthService } from "../../services/auth";
import { TimerService } from "../../services/timer";
import { AppService } from '../../services/app';

import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

@IonicPage() @Component({
  selector: 'page-add-child',
  templateUrl: 'add-child.html',
})
export class AddChildPage {
  public loader: boolean = true;
  public date: Date = moment()['_d'];
  public object: any = {
    monday: false,
    weekdays: ['Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'],
    months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
  };
  public newChildBlock: boolean = false;
  public image: string = '';
  public imageTaken: boolean = false;

  public subscriptionOne: Subscription;

  constructor(
    private appService: AppService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public childrenService: ChildrenService,
    public requestService: RequestService,
    public authService: AuthService,
    public camera: Camera,
    public timerService: TimerService
  ) {
  }

  ionViewDidLeave(): void {
    this.appService.safeUnsubscribe(this.subscriptionOne);
  }

  ionViewWillEnter(): void {
    if (1 < this.childrenService.children.length) {
      this.newChildBlock = true;
    } else {
      this.newChildBlock = false;
    }

    this.imageTaken = false;
    this.loader = false;
  }

  setPicture(): void {
    console.log('setpicture')
    const options: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      targetWidth: 150,
      targetHeight: 150,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options).then(
      (imageData: any) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
      this.imageTaken = true;
      },
      (err) => {
      console.log('error');
    });
  }

  takePicture(): void {
    console.log('takepicture')
    const options: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      targetWidth: 150,
      targetHeight: 150,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
    }

    this.camera.getPicture(options).then(
      (imageData: any) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
      this.imageTaken = true;
      },
      (err) => {
      console.log('error');
    });
  }

  addChild(form: NgForm): void {
    this.loader = true;
    const date = moment(this.date).format('YYYY-MM-DD HH:mm:ss');
    const requestData = {
      token: this.authService.userToken,
      body: {
        'parrent_id': this.authService.userID,
        'name': form.value.name,
        'weight': Number(form.value.weight),
        'length': Number(form.value.length),
        'dateofbirth': date,
        'photo': this.image
      }
    };

    this.subscriptionOne = this.requestService.postMethod('/children/', requestData).subscribe(data => {
      if (!data.error) {
        console.log('Succes')
        this.timerService.breastFeeding.push({
          running: false,
          time: 0,
        });

        this.timerService.bottleFeeding.push({
          running: false,
          time: 0,
        });

        this.timerService.sleeping.push({
          running: false,
          time: 0
        });
      } else {
        console.log('Error')
      }

      this.loader = false;
      this.navCtrl.setRoot(HomePage);
    });
  }

  setDate(date: Date): void {
    this.date = date;
  }

  showTime(time: any): any {
    return moment(time).format('DD.MM.YYYY');
  }

  goBack(): void {
    this.navCtrl.setRoot(HomePage);
  }

}
