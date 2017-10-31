import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatisticModalPage } from './statistic-modal';

@NgModule({
  declarations: [
    StatisticModalPage,
  ],
  imports: [
    IonicPageModule.forChild(StatisticModalPage),
  ],
})
export class StatisticModalPageModule {}
