import { Injectable } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { LoadingController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@capacitor/storage';
import { Device } from '@capacitor/device';
import { Capacitor } from '@capacitor/core';
import { CallbackID, Geolocation, Position } from '@capacitor/geolocation';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  public loading: any;
  platform: any;
  deviceID: string;
  userLocation = { lat: 0, lng: 0 };

  closedDates: Array<string>;
  inputHaveFocused = new BehaviorSubject(false);

  constructor(
    private translate: TranslateService,
    private loadingCtrl: LoadingController,
    private plt: Platform,
    private auth: AuthService
  ) {}

  setPlatform(val) {
    console.log('current platform is ' + val);
    this.platform = val;
  }

  setDeviceID(val) {
    console.log('deviceID is ' + val);
    this.deviceID = val;
  }

  async showMessage(message: string) {
    await Toast.show({
      text: this.translate.instant(message),
    });
  }

  async storeData(key, value) {
    await Storage.set({
      key: key,
      value: value,
    });
  }

  async getDataByKey(key) {
    const val = await Storage.get({ key: key });
    console.log('openBoarding stored value :' + JSON.stringify(val));
    this.getValue(val.value);
  }

  getValue(value): string {
    return value;
  }

  public async showLoadingSpinner() {
    console.log('show loading');
    this.loading = await this.loadingCtrl.create({
      mode: 'ios',
      spinner: 'crescent',
      cssClass: 'my-loading-class',
      backdropDismiss: false,
      animated: true,
    });
    this.loading.present();
    return this.loading;
  }

  public dismissLoading() {
    console.log('hide loading');
    this.loadingCtrl.dismiss();
  }

  getCapacitorPlatform() {
    return Capacitor.getPlatform();
  }

  getPlatformType() {
    return new Promise((resolve, reject) => {
      if (this.plt.is('android')) {
        this.setPlatform('android');
      } else if (this.plt.is('ios')) {
        this.setPlatform('ios');
      }
      resolve(this.platform);
    });
  }

  async getDeviceID() {
    const device = await (await Device.getId()).uuid;
    this.setDeviceID(device);
  }

  getDatesDifference(dateFrom) {
    var remaingTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    let delta = Math.floor(
      (new Date(dateFrom).getTime() - new Date().getTime()) / 1000
    );

    console.log('all remaining seconds ' + delta);
    if (delta > 86400) {
      remaingTime.days = Math.floor(delta / 86400);
      var afterDays = delta - remaingTime.days * 86400;

      if (afterDays > 3600) {
        remaingTime.hours = Math.floor(afterDays / 3600);
        var afterHours = afterDays - remaingTime.hours * 3600;

        if (afterHours > 60) {
          remaingTime.minutes = Math.floor(afterHours / 60);
          remaingTime.seconds = afterHours - remaingTime.minutes * 60;
        }
      } else if (afterHours > 60) {
        remaingTime.minutes = Math.floor(afterHours / 60);

        remaingTime.seconds = afterHours - remaingTime.minutes * 60;
      }
    } else if (delta > 3600 && delta < 86400) {
      remaingTime.hours = Math.floor(delta / 3600);

      var afHours = delta - remaingTime.hours * 3600;

      if (afHours > 60) {
        remaingTime.minutes = Math.floor(afHours / 60);

        remaingTime.seconds = afHours - remaingTime.minutes * 60;
      }
    } else if (delta > 60 && delta < 3600) {
      remaingTime.minutes = Math.floor(delta / 60);
      remaingTime.seconds = delta - remaingTime.minutes * 60;
    }

    return remaingTime;
  }

  getUserLocation() {
    return new Promise(async (resolve, reject) => {
      const locationStatus = await Geolocation.requestPermissions().then(
        async (res) => {
          if (res['location'] == 'granted') {
            const coordinates = await Geolocation.getCurrentPosition();
            console.log(coordinates);
            this.userLocation.lat = coordinates['coords'].latitude;
            this.userLocation.lng = coordinates['coords'].longitude;
            this.setUserLocation(
              coordinates['coords'].latitude,
              coordinates['coords'].longitude
            );
          }
        }
      );
      resolve(locationStatus);
    });
  }

  async updateProviderLocation() {
    await Geolocation.watchPosition(
      { enableHighAccuracy: true },
      (position: Position) => {
        console.log(
          'location :' +
            position['coords'].latitude +
            ' ' +
            position['coords'].longitude
        );
        this.setUserLocation(
          position['coords'].latitude,
          position['coords'].longitude
        );
      }
    ).then((id: CallbackID) => {
      console.log('CallbackID  :' + id);
      this.auth.setProviderLocationID(id);
    });
  }

  setUserLocation(lat, long) {
    this.userLocation.lat = lat;
    this.userLocation.lng = long;
  }

  inputStatus(status: boolean) {
    this.inputHaveFocused.next(status);
  }

  getinputStatus(): Observable<boolean> {
    return this.inputHaveFocused.asObservable();
  }
}
