import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Snap } from './snap';

@NgModule({
  declarations: [
    Snap,
  ],
  imports: [
    IonicPageModule.forChild(Snap),
  ],
  exports: [
    Snap
  ]
})
export class SnapModule {}
