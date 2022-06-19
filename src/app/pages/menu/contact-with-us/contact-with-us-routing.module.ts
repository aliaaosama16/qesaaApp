import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactWithUsPage } from './contact-with-us.page';

const routes: Routes = [
  {
    path: '',
    component: ContactWithUsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactWithUsPageRoutingModule {}
