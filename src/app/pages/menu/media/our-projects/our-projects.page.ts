
import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LanguageService } from 'src/app/services/language/language.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { MediaService } from 'src/app/services/media/media.service';
import { Artical, ArticalsData, ArticalsDataResponse, ArticalType } from 'src/app/models/articals';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-our-projects',
  templateUrl: './our-projects.page.html',
  styleUrls: ['./our-projects.page.scss'],
})
export class OurProjectsPage implements OnInit {
  currentLanguage: string = '';
  projects: Artical[];
  articalData: ArticalsData;
  articalDataResponse: ArticalsDataResponse;
  constructor(
    private platform: Platform,
    private location: Location,
    private languageService: LanguageService,
    private util: UtilitiesService,
    private mediaService: MediaService,
    private auth:AuthService
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      this.location.back();
    });
    this.currentLanguage = this.languageService.getLanguage();
  }

  ngOnInit() {
    this.articalData = {
      lang: this.languageService.getLanguage(),
     // user_id: this.auth.userID.value,
      type: ArticalType.projects,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.mediaService.articals(this.articalData).subscribe(
        (data: ArticalsDataResponse) => {
          if (data.key == 1) {
            this.projects = data.data;
            // console.log(
            //   'articalDataResponse  :  ' +
            //     JSON.stringify(this.articalDataResponse)
            // );
           // this.util.showMessage(data.msg);
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
}
