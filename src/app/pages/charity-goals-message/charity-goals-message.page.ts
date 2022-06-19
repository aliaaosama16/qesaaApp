import { PageData } from 'src/app/models/pageData';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import {
  StaticPageData,
  StaticPageResponse,
  StaticPageTitle,
} from 'src/app/models/staticPage';
import { LanguageService } from 'src/app/services/language/language.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { GeneralService } from 'src/app/services/general/general.service';
import { GeneralSectionResponse } from 'src/app/models/general';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-charity-goals-message',
  templateUrl: './charity-goals-message.page.html',
  styleUrls: ['./charity-goals-message.page.scss'],
})
export class CharityGoalsMessagePage implements OnInit {
  //pageData: PageData;
  charityInfoType: PageData;
  charityInfoData: StaticPageData;
  charityInfoDataResponse: GeneralSectionResponse;
  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private languageService: LanguageService,
    private util: UtilitiesService,
    private general: GeneralService,
    private auth:AuthService
  ) {}

  ngOnInit() {
    this.charityInfoType = this.data.getPageData();
    console.log('cahrity page title :  '+this.charityInfoType.title);
    this.charityInfoData = {
      lang: this.languageService.getLanguage(),
     // user_id: this.auth.userID.value,
      title:this.charityInfoType.title,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.general.staticPages(this.charityInfoData).subscribe(
        (data: StaticPageResponse) => {
          if (data.key == 1) {
            this.charityInfoDataResponse = data.data;
            console.log(
              'charityInfoDataResponse  :  ' +
                JSON.stringify(this.charityInfoDataResponse)
            );
            //this.util.showMessage(data.msg);
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
