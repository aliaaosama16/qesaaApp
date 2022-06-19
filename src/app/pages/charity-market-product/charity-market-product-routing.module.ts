import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharityMarketProductPage } from './charity-market-product.page';

const routes: Routes = [
  {
    path: '',
    component: CharityMarketProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharityMarketProductPageRoutingModule {}
