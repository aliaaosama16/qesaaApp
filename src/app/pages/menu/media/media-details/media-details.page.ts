import { ActivatedRoute } from '@angular/router';
import { Artical, ArticalData, ArticalDataResponse, ArticalsData, ArticalsDataResponse, ArticalType } from 'src/app/models/articals';

import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LanguageService } from 'src/app/services/language/language.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { MediaService } from 'src/app/services/media/media.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.page.html',
  styleUrls: ['./media-details.page.scss'],
})
export class MediaDetailsPage implements OnInit {

  mediaDetails:Artical;
  currentLanguage: string = '';

  articalData: ArticalData;
  articalDataResponse: ArticalDataResponse;
  mediaID:number;
  constructor(
    private platform: Platform,
    private location: Location,
    private languageService: LanguageService,
    private util: UtilitiesService,
    private mediaService: MediaService,
    private activatedRoute:ActivatedRoute,
    private auth:AuthService
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      this.location.back();
    });
    this.currentLanguage = this.languageService.getLanguage();
    this.mediaID= parseInt(  this.activatedRoute.snapshot.paramMap.get('id'))

  }

  ngOnInit() {
    this.articalData = {
      lang: this.languageService.getLanguage(),
     // user_id: this.auth.userID.value,
      media_id:this.mediaID
    };
    this.util.showLoadingSpinner().then((__) => {
      this.mediaService.getArticalByID(this.articalData).subscribe(
        (data: ArticalDataResponse) => {
          if (data.key == 1) {
            this.mediaDetails = data.data;
          } else {
            this.util.showMessage(data.msg);
          }
          this.util.dismissLoading();
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }
}
