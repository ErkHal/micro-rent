import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyListingsPage } from './my-listings';

@NgModule({
  declarations: [
    MyListingsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyListingsPage),
  ],
})
export class MyListingsPageModule {}
