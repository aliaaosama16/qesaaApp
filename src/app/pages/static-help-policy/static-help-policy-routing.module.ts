import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaticHelpPolicyPage } from './static-help-policy.page';

const routes: Routes = [
  {
    path: '',
    component: StaticHelpPolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaticHelpPolicyPageRoutingModule {}
