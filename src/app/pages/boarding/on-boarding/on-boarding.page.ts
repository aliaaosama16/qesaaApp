import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SwiperOptions } from 'swiper';
import { LanguageService } from 'src/app/services/language/language.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import { Storage } from '@capacitor/storage';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { GeneralService } from 'src/app/services/general/general.service';
import { Intro } from 'src/app/models/intro';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.page.html',
  styleUrls: ['./on-boarding.page.scss'],
})
export class OnBoardingPage implements OnInit {
  @ViewChild('swiper') swiper: SwiperComponent;
  introData: Intro;
  getIntro: boolean = false;
  currentlangauge: string;
  boardingConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: false,
    effect: 'fade',
    allowTouchMove: true,
  };
  constructor(
    private langaugeService: LanguageService,
    private router: Router,
    private menuCtrl: MenuController,
    private util:UtilitiesService,
    private general:GeneralService
  ) {
    this.currentlangauge = this.langaugeService.getLanguage();
    this.menuCtrl.enable(false, 'main');
    this.getIntroData();
  }

  ngOnInit() {}

  nextSlide() {
    this.swiper.swiperRef.slideNext();
  }

  start() {
    this.setBoarding();

    this.router.navigateByUrl('/tabs');
  }

  async setBoarding() {
    await Storage.set({
      key: 'qessa-openBoarding',
      value: 'true',
    });
  }

  getIntroData() {
    this.util.showLoadingSpinner().then((__) => {
      this.general.intro().subscribe(
        (data: Intro) => {
          this.introData = data;
         // console.log('INTRO ' + JSON.stringify(this.introData));
          this.util.dismissLoading();
          this.getIntro = true;
        },
        (err) => {
          this.util.dismissLoading();
          this.getIntro = false;
        }
      );
    });
  }

}
