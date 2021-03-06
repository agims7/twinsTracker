import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { Camera, CameraOptions } from '@ionic-native/camera';

import { HomePage } from '../../pages/home/home';

import { RequestService } from "../../services/request";
import { ChildrenService } from '../../services/children';
import { AuthService } from "../../services/auth";
import { AppService } from '../../services/app';

import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

@IonicPage() @Component({
  selector: 'page-edit-child',
  templateUrl: 'edit-child.html',
})
export class EditChildPage {
  public loader: boolean = true;
  public object = {
    monday: false,
    weekdays: ['Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'],
    months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
  };
  public editChildBlock: boolean = false;
  public image: string = '';
  public imageTaken: boolean = false;
  public id: number;
  public name: string;
  public weight: number;
  public length: number;
  public photo: string;
  public date: any;

  public subscriptionOne: Subscription;

  constructor(
    private appService: AppService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public childrenService: ChildrenService,
    public requestService: RequestService,
    public authService: AuthService,
    public camera: Camera
  ) {
  }

  ionViewDidLeave(): void {
    this.appService.safeUnsubscribe(this.subscriptionOne);
  }

  ionViewWillEnter(): void {
    this.getProperties();

    if (1 < this.childrenService.children.length) {
      this.editChildBlock = true;
    } else {
      this.editChildBlock = false;
    }

    if (this.photo) {
      this.imageTaken = true;
    } else {
      this.imageTaken = false;
    }

    this.loader = false;
  }

  getProperties(): void {
    let child = this.navParams.get('child');
    this.name = child.name;
    this.id = child.id;
    this.weight = child.weight;
    this.length = child.length;
    this.photo = child.photo;
    this.date = new Date(child.dateofbirth);
  }

  setPicture(): void {
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
    }
    this.camera.getPicture(options).then((imageData: any) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
      this.imageTaken = true;
    }, (err) => {
      console.log('error');
    });
  }

  takePicture(): void {
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
    };

    this.camera.getPicture(options).then((imageData: any) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
      this.imageTaken = true;
    }, (err) => {
      console.log('error');
    });
  }

  editChild(form: NgForm): void {
    this.loader = true;
    const requestData = {
      token: this.authService.userToken,
      body: {
        'name': this.name,
        'weight': this.weight,
        'length': this.length,
        'dateofbirth': this.date,
        'photo': this.photo,
        'id': this.id
      }
    };

    this.subscriptionOne = this.requestService.putMethod('/children/', requestData).subscribe(data => {
      if (!data.error) {
        console.log('Succes')
      } else {
        console.log('Error')
      }

      this.loader = false;
      this.navCtrl.setRoot(HomePage);
    });
  }

  setDate(date: Date): void {
    const newDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
    this.date = newDate;
  }

  showTime(time: any): any {
    return moment(time).format('DD.MM.YYYY');
  }

  goBack(): void {
    this.navCtrl.setRoot(HomePage);
  }

}
