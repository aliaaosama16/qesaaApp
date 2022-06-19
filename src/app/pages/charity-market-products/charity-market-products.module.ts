import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentModule } from 'src/app/components/shared-component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharityMarketProductsPageRoutingModule } from './charity-market-products-routing.module';

import { CharityMarketProductsPage } from './charity-market-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharityMarketProductsPageRoutingModule,
    SharedComponentModule,
    TranslateModule
  ],
  declarations: [CharityMarketProductsPage]
})
export class CharityMarketProductsPageModule {}
