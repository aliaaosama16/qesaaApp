import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductiveFamiliesPage } from './productive-families.page';

const routes: Routes = [
  {
    path: '',
    component: ProductiveFamiliesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductiveFamiliesPageRoutingModule {}
