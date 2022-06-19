import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OurPresencePageRoutingModule } from './our-presence-routing.module';

import { OurPresencePage } from './our-presence.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OurPresencePageRoutingModule,
    SharedComponentModule
  ],
  declarations: [OurPresencePage]
})
export class OurPresencePageModule {}
