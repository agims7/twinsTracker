import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GrowthPage } from './growth';

@NgModule({
  declarations: [
    GrowthPage,
  ],
  imports: [
    IonicPageModule.forChild(GrowthPage),
  ],
})
export class GrowthPageModule {}
