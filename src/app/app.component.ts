import { LocationData } from './models/provider';
import { ProviderService } from './services/provider/provider.service';
import { SectionsProductsService } from 'src/app/services/sections-products/sections-products.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { AuthService } from './services/auth/auth.service';
import { LanguageService } from './services/language/language.service';
import { UtilitiesService } from './services/utilities/utilities.service';
import { Share } from '@capacitor/share';
import { LogOutData, Status } from './models/auth';
import { Storage } from '@capacitor/storage';
import { GeneralResponse, UserData } from './models/general';
import { interval } from 'rxjs';
//import { SplashScreen } from '@capacitor/splash-screen';
import { CallbackID, Geolocation, Position } from '@capacitor/geolocation';
import { SplashScreen } from '@capacitor/splash-screen';
import { AppData } from './models/data';
import { DataService } from './services/data/data.service';
// import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import OneSignal from 'onesignal-cordova-plugin';
import { DeviceState } from 'onesignal-cordova-plugin/types/Subscription';

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
  marfoofLink: string;

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
    // {
    //   title: 'Supporting productive families',
    //   url: '/tabs/support-productive-families',
    //   iconActive: './../assets/icon/menu-icons/families-active.svg',
    //   iconInActive: './../assets/icon/menu-icons/families-inactive.svg',
    // },
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
    private providerService: ProviderService,
    private dataService: DataService,
    //private oneSignal: OneSignal,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();

    this.languageService.getUpdatedLanguage().subscribe((val) => {
      this.currentLanguage = val;
    });

    this.currentPlatform = this.util.getCapacitorPlatform();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        SplashScreen.hide();
      }, 50);

      
      this.languageService.setInitialAppLanguage();

      this.util.getPlatformType();
      this.util.getDeviceID();

      this.setupPush();

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
    const isLoginedStatus = await Storage.get({ key: 'qesaa-is-login-status' });
    if (loginStatus.value && isLoginedStatus.value) {
      this.auth.isLogined(true);
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
    if (index == 6) {
      console.log('share app');
      this.shareApp();
    } else {
      this.router.navigateByUrl(url);
    }
  }

  getMaroofLink() {
    const userData: UserData = {
      lang: this.languageService.getLanguage(),
    };
    this.util.showLoadingSpinner().then((__) => {
      this.dataService.appData(userData).subscribe(
        (data: AppData) => {
          this.util.dismissLoading();
          if (data.key == 1) {
            //this.marfoofLink = data.maroof;
            window.open(data?.maroof);
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

  setupPush() {
    // // I recommend to put these into your environment.ts
    // this.oneSignal.startInit('8a9d6d2b-bee7-4edd-b2e1-1b7ab872c521', '778904577393');

    // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

    // // Notifcation was received in general
    // this.oneSignal.handleNotificationReceived().subscribe(data => {
    //   let msg = data.payload.body;
    //   let title = data.payload.title;
    //   let additionalData = data.payload.additionalData;
    //   this.showAlert(title, msg, additionalData.task);
    // });

    // // Notification was really clicked/opened
    // this.oneSignal.handleNotificationOpened().subscribe(data => {
    //   // Just a note that the data is a different place here!
    //   let additionalData = data.notification.payload.additionalData;

    //   this.showAlert('Notification opened', 'You already read this before', additionalData.task);
    // });

    // this.oneSignal.endInit();

    this.util.getDevice();

    OneSignal.setNotificationOpenedHandler((jsonData) => {
      console.log('setNotificationOpenedHandler ' + JSON.stringify(jsonData));

      // 'volunteers' 'charity-market'
      // this.dataService.setPageData(page);
      // this.router.navigateByUrl(
      //   `/tabs/my-orders/details/${jsonData.notification.rawPayload?.additionalData.order_id}`
      // );
    });

    OneSignal.setNotificationWillShowInForegroundHandler((jsonData) => {
      console.log(
        'setNotificationWillShowInForegroundHandler ' + JSON.stringify(jsonData)
      );
    });

    // iOS - Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
    OneSignal.promptForPushNotificationsWithUserResponse((accepted) => {
      console.log('User accepted notifications: ' + accepted);
    });
  }
}
