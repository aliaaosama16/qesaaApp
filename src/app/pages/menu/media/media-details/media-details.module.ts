import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediaDetailsPageRoutingModule } from './media-details-routing.module';

import { MediaDetailsPage } from './media-details.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaDetailsPageRoutingModule,
    SharedComponentModule,
    TranslateModule
  ],
  declarations: [MediaDetailsPage]
})
export class MediaDetailsPageModule {}
