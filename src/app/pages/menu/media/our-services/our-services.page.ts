import { Platform } from '@ionic/angular';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { LanguageService } from 'src/app/services/language/language.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { MediaService } from 'src/app/services/media/media.service';
import {
  Artical,
  ArticalsData,
  ArticalsDataResponse,
  ArticalType,
} from 'src/app/models/articals';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GeneralSectionResponse } from 'src/app/models/general';
import {
  SlideData,
  SlideResponse,
  StaticPageTitle,
} from 'src/app/models/staticPage';
import { GeneralService } from 'src/app/services/general/general.service';
import { SwiperOptions } from 'swiper';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
SwiperCore.use([Pagination, Autoplay]);

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.page.html',
  styleUrls: ['./our-services.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OurServicesPage implements OnInit {
  currentLanguage: string = '';
  services: Artical[];
  articalData: ArticalsData;
  articalDataResponse: ArticalsDataResponse;
  slides: GeneralSectionResponse[];
  configSlider: SwiperOptions;
  constructor(
    private platform: Platform,
    private location: Location,
    private languageService: LanguageService,
    private util: UtilitiesService,
    private mediaService: MediaService,
    private auth: AuthService,
    private general: GeneralService
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      this.location.back();
    });
    this.currentLanguage = this.languageService.getLanguage();
  }

  ngOnInit() {
    this.configSlider = {
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: true,
      effect: 'fade',
      autoplay: true,
      loop: true,
    };

    this.getSliders();
  }

  getServices() {
    this.articalData = {
      lang: this.languageService.getLanguage(),
      // user_id:1,
      type: ArticalType.services,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.mediaService.articals(this.articalData).subscribe(
        (data: ArticalsDataResponse) => {
          if (data.key == 1) {
            this.services = data.data;
          } else {
          }
          this.util.dismissLoading();
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }

  getSliders() {
    const slideData: SlideData = {
      lang: this.languageService.getLanguage(),
      type: StaticPageTitle.volunteer,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.general.getSliders(slideData).subscribe(
        (data: SlideResponse) => {
          this.util.dismissLoading();
          if (data.key == 1) {
            this.slides = data.data;
            this.getServices();
          } else {
            this.util.showMessage(data.msg);
          }
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }
}
