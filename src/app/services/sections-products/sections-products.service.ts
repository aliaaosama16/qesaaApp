import { GeneralResponse, UserData } from './../../models/general';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LanguageService } from '../language/language.service';
import { UtilitiesService } from '../utilities/utilities.service';
import {
  CartData,
  ProductData,
  ProductResponse,
  ProductsResponse,
  RatingData,
  SectionProductsData,
  SectionProductsResponse,
  SectionResponse,
  StoreOrderData,
} from 'src/app/models/sections';
import { OrderListResponse } from 'src/app/models/order';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SectionsProductsService {
  cartCount = new BehaviorSubject(0);
  constructor(
    private httpclient: HttpClient,
    private languageService: LanguageService,
    private util: UtilitiesService,
    private auth: AuthService
  ) {
    console.log('user id : ', this.auth.userID.value);
  }

  setCartCount() {
    var count = 0;
    const cartData: UserData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
    };
    // this.util.showLoadingSpinner().then((__) => {
    this.showCart(cartData).subscribe(
      (data: ProductsResponse) => {
        if (data.key == 1) {
          console.log('cart products  :' + data.data);
          for (let i = 0; i < data.data.length; i++) {
            count += data.data[i].count;
          }

          this.cartCount.next(count);
        } else {
          // this.util.showMessage(data.msg);
        }
        //  this.util.dismissLoading();
      },
      (err) => {
        // this.util.dismissLoading();
      }
    );
    // });
  }

  getCartCount(): Observable<number> {
    return this.cartCount.asObservable();
  }

  getAllSections(data: UserData): Observable<SectionResponse> {
    return this.httpclient.post<SectionResponse>(
      `${environment.BASE_URL}sections`,
      data
    );
  }

  getSectionByID(
    data: SectionProductsData
  ): Observable<SectionProductsResponse> {
    return this.httpclient.post<SectionProductsResponse>(
      `${environment.BASE_URL}services`,
      data
    );
  }

  showService(data: ProductData): Observable<ProductResponse> {
    return this.httpclient.post<ProductResponse>(
      `${environment.BASE_URL}show-service`,
      data
    );
  }

  addToCart(data: ProductData): Observable<GeneralResponse> {
    return this.httpclient.post<GeneralResponse>(
      `${environment.BASE_URL}add-to-cart`,
      data
    );
  }

  updateToCart(data: CartData): Observable<GeneralResponse> {
    return this.httpclient.post<GeneralResponse>(
      `${environment.BASE_URL}update-to-cart`,
      data
    );
  }

  showCart(data: UserData): Observable<ProductsResponse> {
    return this.httpclient.post<ProductsResponse>(
      `${environment.BASE_URL}show-cart`,
      data
    );
  }

  storeOrder(data: StoreOrderData): Observable<ProductsResponse> {
    return this.httpclient.post<ProductsResponse>(
      `${environment.BASE_URL}store-order`,
      data
    );
  }

  showAllOrders(data: UserData): Observable<OrderListResponse> {
    return this.httpclient.post<OrderListResponse>(
      `${environment.BASE_URL}show-all-orders`,
      data
    );
  }

  rateProvider(data: RatingData): Observable<GeneralResponse> {
    return this.httpclient.post<GeneralResponse>(
      `${environment.BASE_URL}rate-provider`,
      data
    );
  }
}
