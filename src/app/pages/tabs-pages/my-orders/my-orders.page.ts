import { ProviderService } from './../../../services/provider/provider.service';
import { UserData } from './../../../models/general';
import {
  Order,
  OrderListResponse,
  OrderResponse,
} from './../../../models/order';
import { OrdersService } from './../../../services/orders/orders.service';
import { UtilitiesService } from './../../../services/utilities/utilities.service';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data/data.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {
  orders: Order[];
  providerOrders: Order[] = [];
  volunteerOrders: Order[] = [];
  serviceOrders: Order[] = [];
  orderType: string = 'volunteers';
  userData: UserData;
  userType: string;
  currentlangauge: string;
  constructor(
    private util: UtilitiesService,
    private orderService: OrdersService,
    private languageService: LanguageService,
    private auth: AuthService,
    private router: Router,
    private dataService: DataService,
    private providerService: ProviderService,
    private langaugeservice: LanguageService
  ) {}

  ngOnInit() {
    this.currentlangauge = this.langaugeservice.getLanguage();
    console.log('currentlangauge :'+this.currentlangauge)
    this.userData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
    };
    console.log('current user type :' + this.auth.userType.value);

    this.userType = this.auth.userType.value;

    if (this.userType == 'client') {
      this.showAllOrdersByUserId('volunteer');
    } else {
      this.showAllOrdersByProviderId();
    }
  }

  showAllOrdersByProviderId() {
    this.util.showLoadingSpinner().then((__) => {
      this.providerService.showAllProviderOrders(this.userData).subscribe(
        (data: OrderListResponse) => {
          if (data.key == 1) {
            this.providerOrders = data.data;
          }
          this.util.dismissLoading();
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }
  showAllOrdersByUserId(type: string) {
    this.util.showLoadingSpinner().then((__) => {
      this.orderService.showAllorders(this.userData).subscribe(
        (data: OrderListResponse) => {
          if (data.key == 1) {
            this.orders = data.data;

            if (type == 'charity-market') {
              this.serviceOrders = this.orders.filter(
                (item) => item.type === 'service'
              );
            } else {
              this.volunteerOrders = this.orders.filter(
                (item) => item.type === 'volunteer'
              );
            }
          }
          this.util.dismissLoading();
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }

  orderTypeChoose($event) {
    this.orderType = $event.detail.value;
    console.log($event.detail.value);
    this.showAllOrdersByUserId($event.detail.value);
  }

  showOrder(orderID, page) {
    this.dataService.setPageData(page);
    this.router.navigateByUrl(`/tabs/my-orders/details/${orderID}`);
  }

  doRefresh($event) {
    this.userData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
    };
    console.log('current user type :' + this.auth.userType.value);

    this.userType = this.auth.userType.value;

    if (this.userType == 'client') {
      this.showAllOrdersByUserIdAfterRefreshing($event, 'volunteer');
    } else {
      this.showAllOrdersByProviderIdAfterRefreshing($event);
    }
  }

  showAllOrdersByUserIdAfterRefreshing($event: any, type: string) {
    this.orderService.showAllorders(this.userData).subscribe(
      (data: OrderListResponse) => {
        if (data.key == 1) {
          this.orders = data.data;

          if (type == 'charity-market') {
            this.serviceOrders = this.orders.filter(
              (item) => item.type === 'service'
            );
          } else {
            this.volunteerOrders = this.orders.filter(
              (item) => item.type === 'volunteer'
            );
          }
        }
        $event.target.complete();
      },
      (err) => {
        $event.target.complete();
      }
    );
  }

  showAllOrdersByProviderIdAfterRefreshing($event) {
    this.providerService.showAllProviderOrders(this.userData).subscribe(
      (data: OrderListResponse) => {
        if (data.key == 1) {
          this.providerOrders = data.data;
        }
        $event.target.complete();
      },
      (err) => {
        $event.target.complete();
      }
    );
  }
}
