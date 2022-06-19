import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductiveFamiliesDetailsPage } from './productive-families-details.page';

const routes: Routes = [
  {
    path: '',
    component: ProductiveFamiliesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductiveFamiliesDetailsPageRoutingModule {}
