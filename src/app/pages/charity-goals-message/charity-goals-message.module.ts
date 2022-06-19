import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharityGoalsMessagePageRoutingModule } from './charity-goals-message-routing.module';

import { CharityGoalsMessagePage } from './charity-goals-message.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharityGoalsMessagePageRoutingModule,
    SharedComponentModule,
    TranslateModule
  ],
  declarations: [CharityGoalsMessagePage]
})
export class CharityGoalsMessagePageModule {}
