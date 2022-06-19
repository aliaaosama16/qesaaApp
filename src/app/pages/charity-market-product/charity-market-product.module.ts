import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentModule } from 'src/app/components/shared-component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharityMarketProductPageRoutingModule } from './charity-market-product-routing.module';

import { CharityMarketProductPage } from './charity-market-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharityMarketProductPageRoutingModule,
    SharedComponentModule,
    TranslateModule
  ],
  declarations: [CharityMarketProductPage]
})
export class CharityMarketProductPageModule {}
