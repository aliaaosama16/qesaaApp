import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticeModalPageRoutingModule } from './notice-modal-routing.module';

import { NoticeModalPage } from './notice-modal.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoticeModalPageRoutingModule,
    TranslateModule
  ],
  declarations: [NoticeModalPage]
})
export class NoticeModalPageModule {}
