import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportProductiveFamiliesPage } from './support-productive-families.page';

const routes: Routes = [
  {
    path: '',
    component: SupportProductiveFamiliesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportProductiveFamiliesPageRoutingModule {}
