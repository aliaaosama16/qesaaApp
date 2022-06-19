import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UserData } from 'src/app/models/general';
import {
  NotificationResponse,
  NotificationsInfo,
  NotificationsResponse,
} from 'src/app/models/notifications';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  currentlangauge: string;
  platform: any;
  UserData: UserData;
  notifications: NotificationResponse[];
  getNotifications: boolean = false;
  noNotifications: boolean = false;
  currentPlatform:string;
  constructor(
    private menuCtrl: MenuController,
    private langaugeservice: LanguageService,
    private util: UtilitiesService,
    private router: Router,
    private userNotifications: NotificationsService,
    private alertController: AlertController,
    private translate: TranslateService,
    private auth: AuthService
  ) {
    this.platform = this.util.platform;
    this.auth.getStoredUserID();
    this.currentPlatform=this.util.getCapacitorPlatform()
  }

  ngOnInit() {
    this.currentlangauge = this.langaugeservice.getLanguage();
    console.log(this.currentlangauge);

    this.UserData = {
      lang: this.langaugeservice.getLanguage(),
      user_id: this.auth.userID.value,
    };
    this.showNotification(this.UserData);
  }

  openMenu() {
    this.menuCtrl.open();
  }

  showNotification(notificationData: UserData) {
    this.util.showLoadingSpinner().then((__) => {
      this.userNotifications.showNotification(notificationData).subscribe(
        (data: NotificationsResponse) => {
          if (data.key == 1) {
            if (data.data.length == 0) {
              this.noNotifications = true;
            }
            this.notifications = data.data;
          }
          this.util.dismissLoading();
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }

  openOrederDetails(orderID) {
    this.router.navigateByUrl(
      `/tabs/my-orders/details/` + orderID
    );
  }

  async deleteItem(notification_id: number) {
    const data: NotificationsInfo = {
      lang: this.langaugeservice.getLanguage(),
      notification_id: notification_id,
    };

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode:'ios',
      message: this.translate.instant('confirm delete this notification'),
      buttons: [
        {
          text: this.translate.instant('ok'),
          handler: () => {
            this.util.showLoadingSpinner().then((__) => {
              this.userNotifications.deleteNotification(data).subscribe(
                (data: NotificationsResponse) => {
                  console.log(
                    'delete item ' + JSON.stringify(this.notifications)
                  );
                 // this.util.showMessage(data.msg);

                  this.showNotification(this.UserData);
                  this.updateNoOfNotifications();
                  this.util.dismissLoading();
                },
                (err) => {
                  this.util.dismissLoading();
                }
              );
            });
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

    await alert.present();
  }

  async updateNoOfNotifications() {
    const userID = await Storage.get({ key: 'qesaa-UserID' });
    console.log('stored user id : ' + parseInt(userID.value));
    this.auth.setNoOfNotifications(parseInt(userID.value));
  }
  doRefresh($event) {
    // this.auth.getUserIDObservable().subscribe((val) => {
    //   console.log('user id :' + val);
    //   if (val != 0) {
    this.UserData = {
      lang: this.langaugeservice.getLanguage(),
      user_id: this.auth.userID.value, //val,
    };
    this.userNotifications.showNotification(this.UserData).subscribe(
      (data: NotificationsResponse) => {
        if (data.key == 1) {
          if (data.data.length == 0) {
            this.noNotifications = true;
          }
          this.notifications = data.data;
        }
        $event.target.complete();
      },
      (err) => {
        $event.target.complete();
      }
    );
  }
  //});
  //}
}
