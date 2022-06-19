import { UserData } from './../../models/general';
import { Family, FamilyData, FamilyListResponse } from './../../models/family';
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
import { FamilyService } from 'src/app/services/family/family.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-productive-families',
  templateUrl: './productive-families.page.html',
  styleUrls: ['./productive-families.page.scss'],
})
export class ProductiveFamiliesPage implements OnInit {
  families: Family[];
  familyListResponse: Family[];
  constructor(
    private languageService: LanguageService,
    private util: UtilitiesService,
    private general: GeneralService,
    private familyService: FamilyService,
    private auth:AuthService
  ) {}

  ngOnInit() {
    // this.charityInfoType = this.data.getPageData();
    //console.log('charity page title :  '+this.charityInfoType.title);
    const familyData: UserData = {
      lang: this.languageService.getLanguage(),
     // user_id: this.auth.userID.value,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.familyService.providers(familyData).subscribe(
        (data: FamilyListResponse) => {
          if (data.key == 1) {
            this.families = data.data;
            
          } else {
            this.util.showMessage(data.msg);
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
