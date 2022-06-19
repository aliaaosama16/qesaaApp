import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonationOrderPageRoutingModule } from './donation-order-routing.module';

import { DonationOrderPage } from './donation-order.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonationOrderPageRoutingModule,
    SharedComponentModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [DonationOrderPage],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DonationOrderPageModule {}
