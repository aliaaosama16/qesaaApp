import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteerWithUsPage } from './volunteer-with-us.page';

const routes: Routes = [
  {
    path: '',
    component: VolunteerWithUsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolunteerWithUsPageRoutingModule {}
