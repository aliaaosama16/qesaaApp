import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharityMarketPage } from './charity-market.page';

const routes: Routes = [
  {
    path: '',
    component: CharityMarketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharityMarketPageRoutingModule {}
