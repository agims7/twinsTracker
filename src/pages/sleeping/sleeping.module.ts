import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SleepingPage } from './sleeping';

@NgModule({
  declarations: [
    SleepingPage,
  ],
  imports: [
    IonicPageModule.forChild(SleepingPage),
  ],
})
export class SleepingPageModule {}
