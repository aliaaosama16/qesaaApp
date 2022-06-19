import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ContactUsData } from 'src/app/models/contactUs';
import { GeneralService } from 'src/app/services/general/general.service';
import { StaticPageData, StaticPageResponse, StaticPageTitle } from 'src/app/models/staticPage';
import { LanguageService } from 'src/app/services/language/language.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { GeneralResponse, GeneralSectionResponse } from 'src/app/models/general';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  aboutData: StaticPageData;
  aboutDataResponse:GeneralSectionResponse;
  constructor(
    private platform: Platform,
    private location: Location,
    private general: GeneralService,
    private languageService:LanguageService,
    private util:UtilitiesService
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      this.location.back();
    });
  }

  ngOnInit() {
    this.aboutData = {
      lang: this.languageService.getLanguage(),
     
      title:StaticPageTitle.about
    };
    this.util.showLoadingSpinner().then((__) => {
      this.general.staticPages(this.aboutData).subscribe(
        (data: StaticPageResponse) => {
          if (data.key == 1) {
            this.aboutDataResponse=data.data;
            //console.log('aboutDataResponse  :  '+JSON.stringify(this.aboutDataResponse))
          //  this.util.showMessage(data.msg);
          } else {
            //this.util.showMessage(data.msg);
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
