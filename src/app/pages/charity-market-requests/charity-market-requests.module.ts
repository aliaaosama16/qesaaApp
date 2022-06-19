import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentModule } from 'src/app/components/shared-component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharityMarketRequestsPageRoutingModule } from './charity-market-requests-routing.module';

import { CharityMarketRequestsPage } from './charity-market-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharityMarketRequestsPageRoutingModule,
    SharedComponentModule,
    TranslateModule
  ],
  declarations: [CharityMarketRequestsPage]
})
export class CharityMarketRequestsPageModule {}
