import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { GeneralService } from 'src/app/services/general/general.service';
import { StaticPageData, StaticPageResponse } from 'src/app/models/staticPage';
import { LanguageService } from 'src/app/services/language/language.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { GeneralSectionResponse } from 'src/app/models/general';
import { DataService } from 'src/app/services/data/data.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-static-help-policy',
  templateUrl: './static-help-policy.page.html',
  styleUrls: ['./static-help-policy.page.scss'],
})
export class StaticHelpPolicyPage implements OnInit {
  helpData: StaticPageData;
  helpDataResponse: GeneralSectionResponse;
  constructor(
    private platform: Platform,
    private location: Location,
    private general: GeneralService,
    private languageService: LanguageService,
    private util: UtilitiesService,
    private data: DataService,
    private auth:AuthService
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      this.location.back();
    });
  }

  ngOnInit() {
    const helpData: StaticPageData = {
      lang: this.languageService.getLanguage(),
    //  user_id: this.auth.userID.value,
      title: this.data.getPageData().title,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.general.staticPages(helpData).subscribe(
        (data: StaticPageResponse) => {
          if (data.key == 1) {
            this.helpDataResponse = data.data;
            console.log(
              'StaticHelpPolicy Response  :  ' +
                JSON.stringify(this.helpDataResponse)
            );
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
