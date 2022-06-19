import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharityGoalsMessagePage } from './charity-goals-message.page';

const routes: Routes = [
  {
    path: '',
    component: CharityGoalsMessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharityGoalsMessagePageRoutingModule {}
