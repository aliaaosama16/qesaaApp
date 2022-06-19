import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OurProjectsPageRoutingModule } from './our-projects-routing.module';

import { OurProjectsPage } from './our-projects.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OurProjectsPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [OurProjectsPage]
})
export class OurProjectsPageModule {}
