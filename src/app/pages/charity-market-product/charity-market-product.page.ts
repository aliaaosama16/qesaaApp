import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GeneralSectionResponse } from 'src/app/models/general';
import { SectionsProductsService } from 'src/app/services/sections-products/sections-products.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { ProductData, ProductResponse } from 'src/app/models/sections';
import { LanguageService } from 'src/app/services/language/language.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-charity-market-product',
  templateUrl: './charity-market-product.page.html',
  styleUrls: ['./charity-market-product.page.scss'],
})
export class CharityMarketProductPage implements OnInit {
  productDetails: GeneralSectionResponse;
  userStatus: boolean;

  constructor(
    private router: Router,
    private util: UtilitiesService,
    private sectionsService: SectionsProductsService,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService,
    private auth: AuthService
  ) {
    this.auth.getUserMarketStatus().subscribe((status:any) => {
      console.log('user status ' + status);
      this.userStatus = status;
      console.log(this.userStatus)
    });
  }

  ngOnInit() {
    console.log(
      'id : ' + JSON.stringify(this.activatedRoute.snapshot.paramMap.get('id'))
    );
    const productData: ProductData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
      service_id: parseInt(this.activatedRoute.snapshot.paramMap.get('id')),
    };

    this.util.showLoadingSpinner().then((__) => {
      this.sectionsService.showService(productData).subscribe(
        (data: ProductResponse) => {
          if (data.key == 1) {
            this.productDetails = data.data;
            console.log('get priduct by  :' + this.productDetails);
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

  addProduct() {
    const productData: ProductData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
      service_id: parseInt(this.activatedRoute.snapshot.paramMap.get('id')),
    };

    this.util.showLoadingSpinner().then((__) => {
      this.sectionsService.addToCart(productData).subscribe(
        (data: ProductResponse) => {
          if (data.key == 1) {
            //this.productDetails = data.data;
            console.log('get priduct by  :' + this.productDetails);
            this.util.showMessage(data.msg);
            setTimeout(() => {
              this.sectionsService.setCartCount();
            }, 2000);
           
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
