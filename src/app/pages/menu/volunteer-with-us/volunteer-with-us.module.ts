import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VolunteerWithUsPageRoutingModule } from './volunteer-with-us-routing.module';

import { VolunteerWithUsPage } from './volunteer-with-us.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VolunteerWithUsPageRoutingModule,
    SharedComponentModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [VolunteerWithUsPage]
})
export class VolunteerWithUsPageModule {}
