import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonationOrderPage } from './donation-order.page';

const routes: Routes = [
  {
    path: '',
    component: DonationOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonationOrderPageRoutingModule {}
