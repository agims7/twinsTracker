import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildrenPage } from './children';

@NgModule({
  declarations: [
    ChildrenPage,
  ],
  imports: [
    IonicPageModule.forChild(ChildrenPage),
  ],
})
export class ChildrenPageModule {}
