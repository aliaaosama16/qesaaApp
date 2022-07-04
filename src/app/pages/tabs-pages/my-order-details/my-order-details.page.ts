import { ActivatedRoute } from '@angular/router';
import { OrdersService } from './../../../services/orders/orders.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { SwiperOptions } from 'swiper';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DriverLocationPage } from '../../modals/driver-location/driver-location.page';
import { ImageModalPage } from '../../modals/image-modal/image-modal.page';
import { Order, OrderData, OrderResponse } from 'src/app/models/order';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomModalPage } from '../../modals/custom-modal/custom-modal.page';
import { DataService } from 'src/app/services/data/data.service';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { ChangeStatusData } from 'src/app/models/provider';

@Component({
  selector: 'app-my-order-details',
  templateUrl: './my-order-details.page.html',
  styleUrls: ['./my-order-details.page.scss'],
})
export class MyOrderDetailsPage implements OnInit {
  orderConfig: SwiperOptions;
  currentlangauge: string;
  orderDetails: Order;
  orderType: string;
  userType: string;
  orderMaps: string[] = ['in_way', 'finish', 'cancel'];
  orderStatus: string;

  //   finish: false
  // in_way: false
  // new: true
  // refused: false
  constructor(
    private LanguageService: LanguageService,
    private modalController: ModalController,
    private modalCtrl: ModalController,
    private languageService: LanguageService,
    private util: UtilitiesService,
    private orderService: OrdersService,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private dataService: DataService,
    private providerService: ProviderService
  ) {
    this.currentlangauge = this.LanguageService.getLanguage();
    console.log('page come from  ' + this.dataService.getPageData()?.title);
    this.orderType = this.dataService.getPageData()?.title;

    this.userType = this.auth.userType.value;
    console.log('user type :' + this.userType);
  }

  ngOnInit() {
    const orderData: OrderData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
      order_id: parseInt(this.activatedRoute.snapshot.paramMap.get('id')),
    };
    this.showOrderByOederID(orderData);
    this.orderConfig = {
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: false,
      effect: 'fade',
    };
  }

  async openPreview(itemImages, currentImage) {
    console.log('open iamges modal');
    const modal = await this.modalCtrl.create({
      component: ImageModalPage,
      cssClass: 'transparent-modal',
      componentProps: {
        images: itemImages,
        imageID: currentImage,
        orderImage: itemImages,
      },
    });
    modal.present();
  }

  async driverTrack() {
    const modal = await this.modalController.create({
      component: DriverLocationPage,
      componentProps: {
        lat: this.orderDetails.provider_lat,
        lng: this.orderDetails.provider_lng,
        
      },
      initialBreakpoint: 0.75,
      breakpoints: [0, 0.5, 0.75, 1],
    });
    return await modal.present();
  }

  async clientTrack() {
    const modal = await this.modalController.create({
      component: DriverLocationPage,
      componentProps: {
        lat: this.orderDetails.lat,
        lng: this.orderDetails.lng,
      },
      initialBreakpoint: 0.75,
      breakpoints: [0, 0.5, 0.75, 1],
    });
    return await modal.present();
  }
  showOrderByOederID(orderData: OrderData) {
    this.util.showLoadingSpinner().then((__) => {
      this.orderService.showOrderByOederID(orderData).subscribe(
        (data: OrderResponse) => {
          if (data.key == 1) {
            this.orderDetails = data.data;
          }
          this.util.dismissLoading();
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }

  async rateProvider() {
    console.log('open rating modal');
    const modal = await this.modalCtrl.create({
      component: CustomModalPage,
      cssClass: 'my-custom-modal',
      componentProps: {
        modalType: 'rating',
        orderID: this.orderDetails?.id,
        providerID: this.orderDetails?.provider_id,
        providerName: this.orderDetails?.provider_name,
      },
    });
    modal.present();
  }

  chooseOrderStatus($event) {
    console.log('chosen status :  ' + $event.target.value);
    const changeStatusData: ChangeStatusData = {
      order_id: this.orderDetails?.id,
      status: $event.target.value,
      // cancel_notes: ''
    };
    this.util.showLoadingSpinner().then((__) => {
      this.providerService.changeOrderStatus(changeStatusData).subscribe(
        (data: OrderResponse) => {
          if (data.key == 1) {
            //this.orderDetails = data.data;
            this.util.showMessage(data.msg);

            setTimeout(() => {
              const orderData: OrderData = {
                lang: this.languageService.getLanguage(),
                user_id: this.auth.userID.value,
                order_id: parseInt(
                  this.activatedRoute.snapshot.paramMap.get('id')
                ),
              };
              this.showOrderByOederID(orderData);
            }, 2000);
          }
          this.util.dismissLoading();
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }

  contactWithWhatsapp() {
    console.log(this.orderDetails?.provider_full_phone);
    window.open(
      `https://api.whatsapp.com/send?phone=+${this.orderDetails?.provider_full_phone}&text=hi`
    );
  }
}
