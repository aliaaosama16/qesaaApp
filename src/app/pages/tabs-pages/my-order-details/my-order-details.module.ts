import { SwiperModule } from 'swiper/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyOrderDetailsPageRoutingModule } from './my-order-details-routing.module';

import { MyOrderDetailsPage } from './my-order-details.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyOrderDetailsPageRoutingModule,
    SharedComponentModule,
    TranslateModule,
    SwiperModule
  ],
  declarations: [MyOrderDetailsPage]
})
export class MyOrderDetailsPageModule {}
