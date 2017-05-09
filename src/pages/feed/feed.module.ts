import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Feed } from './feed';

@NgModule({
  declarations: [
    Feed,
  ],
  imports: [
    IonicPageModule.forChild(Feed),
  ],
  exports: [
    Feed
  ]
})
export class FeedModule {}
