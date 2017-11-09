import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BottleFeedingPage } from './bottle-feeding';

@NgModule({
  declarations: [
    BottleFeedingPage,
  ],
  imports: [
    IonicPageModule.forChild(BottleFeedingPage),
  ],
})
export class BottleFeedingPageModule {}
