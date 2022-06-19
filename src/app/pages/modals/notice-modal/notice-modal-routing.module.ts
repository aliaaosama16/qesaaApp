import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticeModalPage } from './notice-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NoticeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticeModalPageRoutingModule {}
