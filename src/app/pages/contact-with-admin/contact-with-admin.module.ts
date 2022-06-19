import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentModule } from './../../components/shared-component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactWithAdminPageRoutingModule } from './contact-with-admin-routing.module';

import { ContactWithAdminPage } from './contact-with-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactWithAdminPageRoutingModule,
    SharedComponentModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [ContactWithAdminPage]
})
export class ContactWithAdminPageModule {}
