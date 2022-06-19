import { Component, OnInit } from '@angular/core';
import {
  GeneralSectionResponse,
  UserData,
  GeneralResponse,
} from 'src/app/models/general';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language/language.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import {
  CartCount,
  CartData,
  ProductsResponse,
  StoreOrderData,
  StoreOrderType,
} from '../../models/sections';
import { SectionsProductsService } from 'src/app/services/sections-products/sections-products.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-charity-market-products',
  templateUrl: './charity-market-products.page.html',
  styleUrls: ['./charity-market-products.page.scss'],
})
export class CharityMarketProductsPage implements OnInit {
  products: GeneralSectionResponse[];

  constructor(
    private router: Router,
    private util: UtilitiesService,
    private languageService: LanguageService,
    private sectionsService: SectionsProductsService,
    private auth:AuthService
  ) {}

  ngOnInit() {
    const cartData: UserData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
    };
    this.getCartProducts(cartData);
  }

  getCartProducts(cartData: UserData) {
    this.util.showLoadingSpinner().then((__) => {
      this.sectionsService.showCart(cartData).subscribe(
        (data: ProductsResponse) => {
          if (data.key == 1) {
            this.products = data.data;
            console.log('cart products  :' + this.products);
          } else {
          //  this.util.showMessage(data.msg);
          }
          this.util.dismissLoading();
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }

  increaseCount(count,cartId){
    count++;
    //call api to update cart

    const cartData: CartData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
      cart_id: cartId,
      count: count,
    };
    //this.util.showLoadingSpinner().then((__) => {
      this.sectionsService.updateToCart(cartData).subscribe(
        (data: GeneralResponse) => {
          if (data.key == 1) {
            this.util.showMessage(data.msg).then((_) => {
              const cartData: UserData = {
                lang: this.languageService.getLanguage(),
                user_id: this.auth.userID.value,
              };
              this.sectionsService.setCartCount();
              this.getCartProducts(cartData);
            });
          } else {
            //this.util.showMessage(data.msg);
          }
        //  this.util.dismissLoading();
        },
        (err) => {
        //  this.util.dismissLoading();
        }
      );
    //});
  }

  decreaseCount(count,cartId){
    if(count>0)count--;
    
    //call api to update cart

    const cartData: CartData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
      cart_id: cartId,
      count: count,
    };
    //this.util.showLoadingSpinner().then((__) => {
      this.sectionsService.updateToCart(cartData).subscribe(
        (data: GeneralResponse) => {
          if (data.key == 1) {
            this.util.showMessage(data.msg).then((_) => {
              const cartData: UserData = {
                lang: this.languageService.getLanguage(),
                user_id: this.auth.userID.value,
              };
              this.sectionsService.setCartCount();
              this.getCartProducts(cartData);
            });
          } else {
            //this.util.showMessage(data.msg);
          }
         // this.util.dismissLoading();
        },
        (err) => {
         // this.util.dismissLoading();
        }
      );
   // });
  }

  deleteProduct(productID) {
    console.log('delete product with id : ' + productID);
    const cartData: CartData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
      cart_id: productID,
      count: CartCount.delete,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.sectionsService.updateToCart(cartData).subscribe(
        (data: GeneralResponse) => {
          if (data.key == 1) {
            this.util.showMessage(data.msg).then((_) => {
              const cartData: UserData = {
                lang: this.languageService.getLanguage(),
                user_id: this.auth.userID.value,
              };
              this.sectionsService.setCartCount();
              this.getCartProducts(cartData);
            });
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

  checkout() {
    const storeOrderData: StoreOrderData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
      type: StoreOrderType.service,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.sectionsService.storeOrder(storeOrderData).subscribe(
        (data: GeneralResponse) => {
          if (data.key == 1) {
            this.util.showMessage(data.msg).then((_) => {
              this.router.navigateByUrl('/tabs/my-orders');
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
  }
}
