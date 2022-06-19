import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverLocationPage } from './driver-location.page';

const routes: Routes = [
  {
    path: '',
    component: DriverLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverLocationPageRoutingModule {}
