import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharityMarketRequestsPage } from './charity-market-requests.page';

const routes: Routes = [
  {
    path: '',
    component: CharityMarketRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharityMarketRequestsPageRoutingModule {}
