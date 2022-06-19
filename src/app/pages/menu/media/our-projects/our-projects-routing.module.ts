import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OurProjectsPage } from './our-projects.page';

const routes: Routes = [
  {
    path: '',
    component: OurProjectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OurProjectsPageRoutingModule {}
