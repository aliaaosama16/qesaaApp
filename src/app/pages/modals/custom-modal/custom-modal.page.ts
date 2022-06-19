import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilitiesService } from '../../../services/utilities/utilities.service';
import { RatingData } from 'src/app/models/sections';
import { LanguageService } from 'src/app/services/language/language.service';
import { SectionsProductsService } from 'src/app/services/sections-products/sections-products.service';
import { GeneralResponse } from '../../../models/general';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.page.html',
  styleUrls: ['./custom-modal.page.scss'],
})
export class CustomModalPage implements OnInit {
  @Input() providerID: number;
  @Input() providerName: string;
  @Input() orderID: number;
  @Input() modalType: string; // rating or auth
  ratingIconName: string = 'star-outline';
  ratingNumber: number = 0;
  constructor(
    private router: Router,
    private auth: AuthService,
    public modal: ModalController,
    private util: UtilitiesService,
    private languageService: LanguageService,
    private sectionsProvider: SectionsProductsService,
    private transalte:TranslateService
  ) {
    console.log('providerID :' + this.providerID);
    console.log('orderID :' + this.orderID);
  }

  ngOnInit() {}

  goLogin() {
    this.modal.dismiss().then((_) => {
      this.router.navigateByUrl('/login');
    });
  }

  rating(ratingNumber) {
    console.log('ratingNumber  :' + ratingNumber);
    this.ratingIconName = 'star';
    this.ratingNumber = ratingNumber;
  }

  sendRatingProvider() {
    console.log(
      'providerID:' +
        this.providerID +
        'orderID:' +
        this.orderID +
        'user:' +
        this.auth.userID.value
    );
    // call api to rate provider

    const rateData: RatingData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
      rate: this.ratingNumber,
      provider_id: this.providerID,
      order_id: this.orderID,
    };

    this.rateProvider(rateData);
  }

  rateProvider(rateData: RatingData) {
    if(this.ratingNumber!=0){
      this.util.showLoadingSpinner().then((__) => {
        this.sectionsProvider.rateProvider(rateData).subscribe(
          (data: GeneralResponse) => {
            if (data.key == 1) {
              this.util.showMessage(data.msg)
              .then(() => {
                this.modal.dismiss();
              });
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
    }else{
      this.util.showMessage(this.transalte.instant('rate first '));
    }
   
  }
}
