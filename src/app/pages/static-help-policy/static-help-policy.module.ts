import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaticHelpPolicyPageRoutingModule } from './static-help-policy-routing.module';

import { StaticHelpPolicyPage } from './static-help-policy.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaticHelpPolicyPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [StaticHelpPolicyPage]
})
export class StaticHelpPolicyPageModule {}
