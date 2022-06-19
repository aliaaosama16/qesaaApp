import { DataService } from './../../services/data/data.service';
import { UserData } from 'src/app/models/general';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { SectionsProductsService } from 'src/app/services/sections-products/sections-products.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { Order, OrderListResponse } from 'src/app/models/order';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-charity-market-requests',
  templateUrl: './charity-market-requests.page.html',
  styleUrls: ['./charity-market-requests.page.scss'],
})
export class CharityMarketRequestsPage implements OnInit {
  // 1 waiting 2 canceled 3  confirmed
  requests: Order[];

  constructor(
    private languageService: LanguageService,
    private util: UtilitiesService,
    private sectionsService: SectionsProductsService,
    private auth:AuthService,
    private dataService:DataService,
    private router:Router
  ) {}
  // showAllOrders
  ngOnInit() {
    const userData: UserData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
    };
    this.getAllOrders(userData);
  }

  getAllOrders(userData: UserData) {
    this.util.showLoadingSpinner().then((__) => {
      this.sectionsService.showAllOrders(userData).subscribe(
        (data: OrderListResponse) => {
          if (data.key == 1) {
            console.log('all orders : ' + JSON.stringify(data.data));
            this.requests=data.data.filter( (item) => item.type === 'service')
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

  showOrder(orderID, page) {
    this.dataService.setPageData(page);
    this.router.navigateByUrl(`/tabs/my-orders/details/${orderID}`);
  }

}
