import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverLocationPageRoutingModule } from './driver-location-routing.module';

import { DriverLocationPage } from './driver-location.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
 
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverLocationPageRoutingModule,
    TranslateModule
  ],
  declarations: [DriverLocationPage]
})
export class DriverLocationPageModule {}
