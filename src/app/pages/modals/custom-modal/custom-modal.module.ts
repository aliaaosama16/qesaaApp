import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomModalPageRoutingModule } from './custom-modal-routing.module';

import { CustomModalPage } from './custom-modal.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomModalPageRoutingModule,
    TranslateModule
  ],
  declarations: [CustomModalPage]
})
export class CustomModalPageModule {}
