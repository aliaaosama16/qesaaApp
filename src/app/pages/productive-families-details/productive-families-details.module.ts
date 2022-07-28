import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductiveFamiliesDetailsPageRoutingModule } from './productive-families-details-routing.module';

import { ProductiveFamiliesDetailsPage } from './productive-families-details.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductiveFamiliesDetailsPageRoutingModule,
    SharedComponentModule,
    TranslateModule,
    SwiperModule
  ],
  declarations: [ProductiveFamiliesDetailsPage]
})
export class ProductiveFamiliesDetailsPageModule {}
