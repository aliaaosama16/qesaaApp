import { UtilitiesService } from './../../services/utilities/utilities.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { GeneralSectionResponse, UserData } from 'src/app/models/general';
import { SectionsProductsService } from 'src/app/services/sections-products/sections-products.service';

import { Router } from '@angular/router';
import {
  SectionProductsData,
  SectionProductsResponse,
  SectionResponse,
} from 'src/app/models/sections';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-charity-market',
  templateUrl: './charity-market.page.html',
  styleUrls: ['./charity-market.page.scss'],
})
export class CharityMarketPage implements OnInit {
  selectedIndex:string ;
  categoriesConfig: SwiperOptions;
  currentlangauge: string;
  sections: GeneralSectionResponse[];
  sectionProducts: GeneralSectionResponse[];
  constructor(
    private languageService: LanguageService,
    private util: UtilitiesService,
    private sectionsService: SectionsProductsService,
    private router: Router,
    private auth:AuthService
  ) {
    this.currentlangauge = this.languageService.getLanguage();
  }

  ngOnInit() {
    this.categoriesConfig = {
      slidesPerView: 3.4,
      spaceBetween: 6,
      pagination: false,
      effect: 'fade',
    };

    // set cart count 
   // this.sectionsService.setCartCount();

    // get all sections



    const sectionData: UserData = {
      lang: this.languageService.getLanguage(),
      user_id:this.auth.userID.value,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.sectionsService.getAllSections(sectionData).subscribe(
        (data: SectionResponse) => {
          if (data.key == 1) {
            this.sections = data.data;
            console.log('all sections :' + this.sections);
           this.getProductsBySection(  this.sections[0].id);
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
  catSelect(catIndex){
    console.log(catIndex)
    this.selectedIndex=catIndex;
  }
  segmentChanged($event) {
  
    console.log('selected :' + $event.target.value);

    this.getProductsBySection($event.target.value);
  }

  getProductsBySection(sectionID) {
    const sectionProductsData: SectionProductsData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
      section_id: sectionID,
    };

    this.util.showLoadingSpinner().then((__) => {
      this.sectionsService.getSectionByID(sectionProductsData).subscribe(
        (data: SectionProductsResponse) => {
          if (data.key == 1) {
            this.sectionProducts = data.data;
            console.log('all products by section :' + this.sections);
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

  showService(productID) {
    console.log('product id :' + productID);
    this.router.navigateByUrl(`/tabs/home/market/product/${productID}`);
  }
}
