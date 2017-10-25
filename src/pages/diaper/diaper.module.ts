import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiaperPage } from './diaper';

@NgModule({
  declarations: [
    DiaperPage,
  ],
  imports: [
    IonicPageModule.forChild(DiaperPage),
  ],
})
export class DiaperPageModule {}
