import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OurPresencePage } from './our-presence.page';

const routes: Routes = [
  {
    path: '',
    component: OurPresencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OurPresencePageRoutingModule {}
