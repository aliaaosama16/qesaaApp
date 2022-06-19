import { GeneralSectionResponse, UserData } from './../../../models/general';
import { Router } from '@angular/router';
import { UtilitiesService } from './../../../services/utilities/utilities.service';
import { MenuController, Platform, IonRouterOutlet } from '@ionic/angular';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { LanguageService } from 'src/app/services/language/language.service';
import { DataService } from 'src/app/services/data/data.service';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { HomeService } from 'src/app/services/home/home.service';
import { HomeResponse } from 'src/app/models/home';
import { StaticPageResponse, StaticPageTitle } from 'src/app/models/staticPage';
import { GeneralService } from 'src/app/services/general/general.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { interval, Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';


SwiperCore.use([Pagination, Autoplay]);
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage implements OnInit {
  public intervallTimer = interval(1000);
  private subscription;

  configSlider: SwiperOptions;
  partenrsConfig: SwiperOptions;
  feedbackConfig: SwiperOptions;
  partenrs: GeneralSectionResponse[];
  people_feedback: GeneralSectionResponse[];
  Sliders: GeneralSectionResponse[];
  volunteers_count: string = '0';
  beneficiaries_count: string = '0';
  satisfaction_masure: string = '0';
  platform: string = '';
  currentlangauge: string;
  appData: any;
  appDataResponse: GeneralSectionResponse[];
  //charityInfoTitle:StaticPageTitle;
  upComingDate: any = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  obs: any;
  myInterval: Observable<any>;
  constructor(
    private menuCtrl: MenuController,
    private util: UtilitiesService,
    private general: GeneralService,
    private router: Router,
    private data: DataService,
    private home: HomeService,
    private languageService: LanguageService,
    private auth: AuthService,
    private plt: Platform,
    private routerOutlet: IonRouterOutlet,
   
  ) {
    this.platform = this.util.platform;
    this.currentlangauge = this.languageService.getLanguage();
    this.menuCtrl.enable(true, 'main');
    console.log('user id : ' + this.auth.userID.value);
    // this.plt.backButton.subscribeWithPriority(-1, () => {
    //   if (!this.routerOutlet.canGoBack()) {
    //    // App.exitApp();
    //   }
    // });
  }



  ngOnInit() {
    this.menuCtrl.enable(true, 'main');
    this.configSlider = {
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: true,
      effect: 'fade',
      autoplay: true,
      loop: true,
    };

    this.partenrsConfig = {
      slidesPerView: 3.1,
      spaceBetween: 24,
      pagination: false,
      effect: 'fade',
    };

    this.feedbackConfig = {
      slidesPerView: 2,
      spaceBetween: 10,
      pagination: false,
      effect: 'fade',
    };

    const userData: UserData = {
      lang: this.languageService.getLanguage(),
    };
    this.getHomeData(userData);
  }

  openMenu() {
    this.menuCtrl.open();
    this.menuCtrl.enable(true, 'main');
  }

  charityInfo(title: string) {
    this.router.navigate([`/tabs/home/info`]);
    if (title == 'goals') this.data.setPageData(StaticPageTitle.goals);
    if (title == 'message') this.data.setPageData(StaticPageTitle.message);
    if (title == 'vission') this.data.setPageData(StaticPageTitle.vission);
  }

  async getHomeData(userData: UserData) {
    this.util.showLoadingSpinner().then((__) => {
      this.home.home(userData).subscribe(
        (data: HomeResponse) => {
          if (data.key == 1) {
            this.partenrs = data.data?.partners;
            this.Sliders = data.data?.sliders;
            this.people_feedback = data.data?.says;
            this.volunteers_count = data.data.volunteers_count;
            this.satisfaction_masure = data.data?.satisfaction_masure;
            this.beneficiaries_count = data.data?.beneficiaries_count;

            this.countRemainingTime(data.data.upcoming_date);
          }
          this.util.dismissLoading();
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }

  countRemainingTime(date) {
    // this.subscription = this.intervallTimer.subscribe(() => {
    this.upComingDate = this.util.getDatesDifference(date);
    // });
  }

  showPartener(partenerUrl: string) {
    console.log(partenerUrl);
    window.open(partenerUrl);
  }

  doRefresh($event) {
    const userData: UserData = {
      lang: this.languageService.getLanguage(),
      // user_id: this.auth.userID.value == 0 ? 1 : this.auth.userID.value,
    };
    this.home.home(userData).subscribe(
      // {
      //   next: () => fail('should have failed with the 404 error'),
      //   error: (error: HttpErrorResponse) => {
      //     expect(error.status).withContext('status').toEqual(404);
      //     expect(error.error).withContext('message').toEqual('');
      //   },
      // }
      (data: HomeResponse) => {
        if (data.key == 1) {
          this.partenrs = data.data?.partners;
          this.Sliders = data.data?.sliders;
          this.people_feedback = data.data?.says;
          this.volunteers_count = data.data.volunteers_count;
          this.satisfaction_masure = data.data?.satisfaction_masure;
          this.beneficiaries_count = data.data?.beneficiaries_count;
          this.countRemainingTime(data.data.upcoming_date);
        }
        $event.target.complete();
      },
      (err) => {
        $event.target.complete();
      }
    );
  }

  // ionViewDidLeave() {
  //   this.subscription.unsubscribe();
  // }
}
