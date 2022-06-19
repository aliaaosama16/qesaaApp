import { LocationData } from './models/provider';
import { ProviderService } from './services/provider/provider.service';
import { SectionsProductsService } from 'src/app/services/sections-products/sections-products.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth/auth.service';
import { LanguageService } from './services/language/language.service';
import { UtilitiesService } from './services/utilities/utilities.service';
import { Share } from '@capacitor/share';
import { LogOutData, Status } from './models/auth';
import { Storage } from '@capacitor/storage';
import { GeneralResponse } from './models/general';
import { interval } from 'rxjs';
import { SplashScreen } from '@capacitor/splash-screen';
import { CallbackID, Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // get provider location every 5 minutes
  public intervallTimer = interval(1000 * 60 * 5);
  @ViewChild('customOverlay', { static: false }) customOverlay: ElementRef;
  private subscription;
  currentLanguage: string = '';
  language: string = '';
  selectedIndex: number;
  logoutData: LogOutData;
  currentPlatform: string;
  splash: boolean = false;
  pages = [
    {
      title: 'about',
      url: '/tabs/about',
      iconActive: './../assets/icon/menu-icons/about-active.svg',
      iconInActive: './../assets/icon/menu-icons/about.svg',
    },
    {
      title: 'our-services',
      url: '/tabs/our-services',
      iconActive: './../assets/icon/menu-icons/services-active.svg',
      iconInActive: './../assets/icon/menu-icons/service.svg',
    },
    {
      title: 'news',
      url: '/tabs/news',
      iconActive: './../assets/icon/menu-icons/news-active.svg',
      iconInActive: './../assets/icon/menu-icons/news.svg',
    },
    {
      title: 'our-projects',
      url: '/tabs/our-projects',
      iconActive: './../assets/icon/menu-icons/projects-active.svg',
      iconInActive: './../assets/icon/menu-icons/projects.svg',
    },
    {
      title: 'gallery',
      url: '/tabs/gallery',
      iconActive: './../assets/icon/menu-icons/gallary-active.svg',
      iconInActive: './../assets/icon/menu-icons/gallery.svg',
    },
    {
      title: 'volunteer with us',
      url: '/tabs/volunteer-with-us',
      iconActive: './../assets/icon/menu-icons/donate-active.svg',
      iconInActive: './../assets/icon/menu-icons/volunteer.svg',
    },
    {
      title: 'Supporting productive families',
      url: '/tabs/support-productive-families',
      iconActive: './../assets/icon/menu-icons/families-active.svg',
      iconInActive: './../assets/icon/menu-icons/families-inactive.svg',
    },
    {
      title: 'share app',
      url: 'share',
      iconActive: './../assets/icon/menu-icons/share-active.svg',
      iconInActive: './../assets/icon/menu-icons/share.svg',
    },
    {
      title: 'our presence',
      url: '/tabs/our-presence',
      iconActive: './../assets/icon/menu-icons/presence-active.svg',
      iconInActive: './../assets/icon/menu-icons/present.svg',
    },
    {
      title: 'contact us',
      url: '/tabs/contact-with-us',
      iconActive: './../assets/icon/menu-icons/contact-active.svg',
      iconInActive: './../assets/icon/menu-icons/contact.svg',
    },
    {
      title: 'Suggestions and complaints',
      url: '/tabs/suggestions',
      iconActive: './../assets/icon/menu-icons/notices-active.svg',
      iconInActive: './../assets/icon/menu-icons/suggestions.svg',
    },
    {
      title: 'Terms and Conditions',
      url: '/tabs/rules',
      iconActive: './../assets/icon/menu-icons/rules-active.svg',
      iconInActive: './../assets/icon/menu-icons/rules.svg',
    },
  ];

  constructor(
    private platform: Platform,
    private languageService: LanguageService,
    private util: UtilitiesService,
    private router: Router,
    private auth: AuthService,
    private sectionsService: SectionsProductsService,
    private providerService: ProviderService
  ) {
    this.initializeApp();

    this.languageService.getUpdatedLanguage().subscribe((val) => {
      this.currentLanguage = val;
    });

    this.currentPlatform = this.util.getCapacitorPlatform();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //   SplashScreen.hide();

      this.languageService.setInitialAppLanguage();

      this.util.getPlatformType();
      this.util.getDeviceID();

      // this.fcmService.initFcm();

      this.util.getUserLocation();
      this.getLoginStatus();
      console.log(this.util.userLocation.lat, this.util.userLocation.lng);
    });
  }

  async showCustomSplash() {
    // await SplashScreen.show({
    //   fadeInDuration	:2000,
    //   fadeOutDuration	:2000
    // });
    // setTimeout(function () {
    //   this.splash = true;
    //   this.customOverlay.nativeElement.style.display = 'none';
    //   this.router.navigate(['boarding']);
    // }, 3000);
  }

  async getLoginStatus() {
    const loginStatus = await Storage.get({ key: 'qesaa-activation-status' });

    if (loginStatus.value) {
      this.auth.isLogined();
      this.getUserNotifications();
      this.getStoredUserType();
      this.getUserMarketStatus();
    }
  }

  getUserMarketStatus() {
    Storage.get({ key: 'qesaa-CanBuy' }).then((val: any) => {
      this.auth.userCanBuyFromMarket.next(val.value);
    });
  }

  async getStoredUserType() {
    const userType = await Storage.get({ key: 'qesaa-UserType' });
    this.auth.userType.next(userType.value);
    console.log('this.auth.userType.value :' + this.auth.userType.value);
    if (this.auth.userType.value == 'provider') {
      this.util.updateProviderLocation();
    } else {
      this.sectionsService.setCartCount();
    }
  }

 

  async getUserNotifications() {
    const userID = await Storage.get({ key: 'qesaa-UserID' });
    console.log('stored user id : ' + parseInt(userID.value));
    this.auth.setNoOfNotifications(parseInt(userID.value));
    this.auth.userID.next(parseInt(userID.value));
  }

  async shareApp() {
    await Share.share({
      title: 'kesa app',
      url: 'https://play.google.com/store/apps/details?id=com.efada.qesaa.app',
    });
  }

  selectMenuItem(index, url) {
    this.selectedIndex = index;
    if (index == 7) {
      console.log('share app');
      this.shareApp();
    } else {
      this.router.navigateByUrl(url);
    }
  }
}
