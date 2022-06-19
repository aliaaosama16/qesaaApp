import { Injectable } from '@angular/core';
import { AppData, AppDataOptions } from 'src/app/models/data';
import { GeneralSectionResponse, UserData } from 'src/app/models/general';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data/data.service';
import { LanguageService } from '../language/language.service';
import { UtilitiesService } from '../utilities/utilities.service';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  cities: GeneralSectionResponse[];
  order_times: GeneralSectionResponse[];
  our_location: GeneralSectionResponse[];
  appData: AppDataOptions;
  constructor(
    private languageService: LanguageService,
    private util: UtilitiesService,
    private dataService: DataService,
    private auth:AuthService
  ) {}

    getData() {
    const userData: UserData = {
      lang: this.languageService.getLanguage(),
     // user_id: this.auth.userID.value,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.dataService.appData(userData).subscribe(
        (data: AppData) => {
          if (data.key == 1) {
            this.appData = data.data;
            console.log('all app data :' + JSON.stringify(data));
            // this.cities = data.data.cities;
            // this.order_times = data.data.order_times;
            // this.our_location = data.data.our_location;

            // this.setAppDataOptions(
            //   data.data.cities,
            //   data.data.order_times,
            //   data.data.our_location
            // );
          } else {
           // this.util.showMessage(data.msg);
          }
          this.util.dismissLoading();
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }

  setAppDataOptions(appData: AppDataOptions) {
    this.appData = appData;
  }

  getAppData() {
    return this.appData;
  }
}
