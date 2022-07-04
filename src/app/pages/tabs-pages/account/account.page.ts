import { AlertController } from '@ionic/angular';
import { LogOutData } from './../../../models/auth';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  AuthDataResponse,
  GeneralResponse,
  UserData,
} from 'src/app/models/general';
import { DataService } from 'src/app/services/data/data.service';
import { StaticPageTitle } from 'src/app/models/staticPage';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthResponse } from 'src/app/models/auth';
import { LanguageService } from '../../../services/language/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  userData: AuthDataResponse;
  socailMedia: GeneralResponse;
  whatsApp: string;
  instgram: string;
  twitter: string;
  otherLanguage: string;
  currentLanguage: string;
  notifcationsStatus: boolean = true;
  constructor(
    private router: Router,
    private util: UtilitiesService,
    private auth: AuthService,
    private data: DataService,
    private languageService: LanguageService,
    private alertController: AlertController,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.languageService.getUpdatedLanguage().subscribe((lang) => {
      console.log('current language :' + lang);
      this.otherLanguage = lang == 'ar' ? 'English' : 'عربي';
      const userData: UserData = {
        user_id: this.auth.userID.value,
        lang: lang,
      };
      this.getUserData(userData);
    });
    console.log(this.notifcationsStatus);
  }

  getUserData(userData: UserData) {
    this.util.showLoadingSpinner().then((__) => {
      this.auth.userData(userData).subscribe(
        (data: AuthResponse) => {
          if (data.key == 1) {
            this.userData = data.data;
            console.log('user all data :' + JSON.stringify(this.userData));

            this.whatsApp = data.whatsapp;
            this.instgram = data.instagram;
            this.twitter = data.twitter;
          } else {
            //  this.util.showMessage(data.msg);
          }
          this.util.dismissLoading();
        },
        (err) => {
          this.util.dismissLoading();
          //this.getData = false;
        }
      );
    });
  }

  helpPage() {
    this.staticPage(StaticPageTitle.support);
  }

  policyPage() {
    this.staticPage(StaticPageTitle.policy);
  }

  aboutPage() {
    this.staticPage(StaticPageTitle.about);
  }

  staticPage(type: StaticPageTitle) {
    this.router.navigateByUrl('/tabs/account/static-help-policy');
    this.data.setPageData(type);
  }

  openUrl(type: string) {
    if (type == 'whatsapp') {
      // open whatsapp
      window.open(
        `https://api.whatsapp.com/send?phone=+${this.whatsApp}&text=`
      );
    }
    if (type == 'instgram') {
      window.open(this.instgram);
    }
    if (type == 'twitter') {
      window.open(this.twitter);
    }
  }

  changeLanguage() {
    if (this.languageService.getLanguage() == 'ar') {
      document.documentElement.dir = 'ltr';
      this.languageService.setLanguage('en');
    } else {
      document.documentElement.dir = 'rtl';
      this.languageService.setLanguage('ar');
    }
    window.location.reload();
  }

  async logout() {
    const logoutData: LogOutData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
      device_id: this.util.deviceID,
    };

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.translate.instant('confirm logout'),
      buttons: [
        {
          text: this.translate.instant('ok'),
          handler: () => {
            this.logoutService(logoutData);
          },
        },
        {
          text: this.translate.instant('cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
      ],
    });
    alert.present();
  }

  logoutService(logoutData: LogOutData) {
    this.util.showLoadingSpinner().then((__) => {
      this.auth.logout(logoutData).subscribe(
        (data: AuthResponse) => {
          if (data.key == 1) {
            this.util.showMessage(data.msg);
            
           // setTimeout(()=>{
              this.auth.removeRegistrationData().then( (_) => {
                this.router.navigateByUrl('/tabs/home');
                if (this.auth.userType.value == 'provider') {
                  this.removeWatchDriverLocation();
                }
              });
           // },2200)
            
           
            console.log('logout data :' + JSON.stringify(this.userData));
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

  async removeWatchDriverLocation() {
    await Geolocation.clearWatch({
      id: this.auth.getProviderLocationID(),
    });
  }

  changeNotifcationsStatus() {
    console.log('notifcationsStatus :' + this.notifcationsStatus);
    this.notifcationsStatus = !this.notifcationsStatus;
  }

  doRefresh($event) {
    this.languageService.getUpdatedLanguage().subscribe((lang) => {
      console.log('current language :' + lang);
      this.otherLanguage = lang == 'ar' ? 'English' : 'عربي';
      const userData: UserData = {
        user_id: this.auth.userID.value,
        lang: lang,
      };
      this.auth.userData(userData).subscribe(
        (data: AuthResponse) => {
          if (data.key == 1) {
            this.userData = data.data;
            console.log('user all data :' + JSON.stringify(this.userData));

            this.whatsApp = data.whatsapp;
            this.instgram = data.instagram;
            this.twitter = data.twitter;
          } else {
          }
          $event.target.complete();
        },
        (err) => {
          $event.target.complete();
        }
      );
    });
  }
}
