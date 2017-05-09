import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Stories } from './stories';

@NgModule({
  declarations: [
    Stories,
  ],
  imports: [
    IonicPageModule.forChild(Stories),
  ],
  exports: [
    Stories
  ]
})
export class StoriesModule {}
