import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Family, FamilyDataResponse } from 'src/app/models/family';
import { LanguageService } from 'src/app/services/language/language.service';
import { FamilyService } from '../../services/family/family.service';
import { FamilyData } from '../../models/family';
import { UtilitiesService } from '../../services/utilities/utilities.service';

@Component({
  selector: 'app-productive-families-details',
  templateUrl: './productive-families-details.page.html',
  styleUrls: ['./productive-families-details.page.scss'],
})
export class ProductiveFamiliesDetailsPage implements OnInit {
  langauge: string;
  familyDetails: Family;
  constructor(
    private languageService: LanguageService,
    private familyService: FamilyService,
    private activatedRoute: ActivatedRoute,
    private util: UtilitiesService
  ) {
    this.langauge = this.languageService.getLanguage();
  }

  ngOnInit() {
    const familyData: FamilyData = {
      lang: this.languageService.getLanguage(),
      provider_id: parseInt(this.activatedRoute.snapshot.paramMap.get('id')),
    };
    this.util.showLoadingSpinner().then((__) => {
      this.familyService.showProvider(familyData).subscribe(
        (data: FamilyDataResponse) => {
          if (data.key == 1) {
            this.familyDetails = data.data;
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

  showProviderSocail(type: string, url) {
    if (type == 'whats') {
      window.open(`https://api.whatsapp.com/send?phone=${url}&text=`);
    } else {
      window.open(url);
    }

    // https://api.whatsapp.com/send?phone=+201013288575&text=test
  }
}
