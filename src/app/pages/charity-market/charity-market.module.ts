import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharityMarketPageRoutingModule } from './charity-market-routing.module';

import { CharityMarketPage } from './charity-market.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';
import { SwiperModule } from 'swiper/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharityMarketPageRoutingModule,
    SharedComponentModule,
    SwiperModule,
    TranslateModule
  ],
  declarations: [CharityMarketPage]
})
export class CharityMarketPageModule {}
