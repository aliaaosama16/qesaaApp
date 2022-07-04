import {
  AuthDataResponse,
  CitysData,
  CitysResponse,
  GeneralResponse,
  GeneralSectionResponse,
  UserData,
} from './../../../models/general';
import { UtilitiesService } from './../../../services/utilities/utilities.service';
import {
  ActionSheetController,
  ModalController,
  Platform,
} from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { StoreOrderData, StoreOrderType } from 'src/app/models/sections';
import { SectionsProductsService } from 'src/app/services/sections-products/sections-products.service';
import { AppData } from 'src/app/models/data';
import { DataService } from 'src/app/services/data/data.service';
declare var google: any;
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { GeneralService } from 'src/app/services/general/general.service';
import { UploadImageService } from 'src/app/services/uploadImage/upload-image.service';
import { AuthResponse } from 'src/app/models/auth';
import { Router } from '@angular/router';
import { NoticeModalPage } from '../../modals/notice-modal/notice-modal.page';
import { TranslateService } from '@ngx-translate/core';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@awesome-cordova-plugins/native-geocoder/ngx';

@Component({
  selector: 'app-donation-order',
  templateUrl: './donation-order.page.html',
  styleUrls: ['./donation-order.page.scss'],
})
export class DonationOrderPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  @ViewChild('popoverDatetime', { static: false }) popoverDatetime: ElementRef;

  map: google.maps.Map;
  home: google.maps.Marker;
  lat: number = 0;
  long: number = 0;
  infowindow = new google.maps.InfoWindow();
  currentLanguage: string;
  donationForm: FormGroup;
  requestImage: any = '';

  requestTimes: GeneralSectionResponse[];
  cities: GeneralSectionResponse[];
  neighborhoods: GeneralSectionResponse[];
  userData: AuthDataResponse;
  requestDate = '';
  inputFocused: boolean = false;
  address: string;
  constructor(
    private languageService: LanguageService,
    private formBuilder: FormBuilder,
    private plt: Platform,
    private util: UtilitiesService,
    private sectionsService: SectionsProductsService,
    private dataService: DataService,
    private auth: AuthService,
    private general: GeneralService,
    private uploadImage: UploadImageService,
    private sanitizer: DomSanitizer,
    private router: Router,
    public modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private translate: TranslateService,
    private nativeGeocoder: NativeGeocoder
  ) {
    this.currentLanguage = this.languageService.getLanguage();
    this.plt.keyboardDidShow.subscribe((ev) => {
      // const { keyboardHeight } = ev;
      // Do something with the keyboard height such as translating an input above the keyboard.
      console.log('keyboard event :' + JSON.stringify(ev));
    });
  }

  inputHaveFocused(inputFocusStatus) {
    this.util.inputStatus(inputFocusStatus);
  }

  ngOnInit() {
    this.lat = this.util.userLocation.lat;
    this.long = this.util.userLocation.lng;

    const userData: UserData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
    };

    this.buildForm();
    this.getOrderTimes(userData);
    this.getUserData(userData);
  }

  ngAfterViewInit() {
    this.loadMap();
    this.loadItemPosition();
  }

  buildForm() {
    this.donationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^05/),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      city: ['', [Validators.minLength(2)]],
      neighborhood: ['', [Validators.minLength(2)]],
      lat: ['', [Validators.required]],
      lng: ['', [Validators.required]],
      requestDate: ['', [Validators.required, Validators.minLength(2)]],
      requestTime: ['', [Validators.required]],
      requestImage: ['', [Validators.required]],
      notices: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  getOrderTimes(userData: UserData) {
    this.util.showLoadingSpinner().then((__) => {
      this.dataService.appData(userData).subscribe(
        (data: AppData) => {
          this.util.dismissLoading();
          if (data.key == 1) {
            this.requestTimes = data.data.order_times;
            this.getAllCities();

            console.log(
              ' this.locations  :' + JSON.stringify(this.requestTimes)
            );
          } else {
            this.util.showMessage(data.msg);
          }
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }

  chooseTime($event) {
    console.log('selected time :' + $event.target.value);
    this.donationForm.value.requestTime = $event.target.value;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translate.instant('get photo'),
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: this.translate.instant('from gallery'),
          role: 'destructive',
          id: 'delete-button',
          data: {
            type: 'delete',
          },
          handler: () => {
            console.log('gallery clicked');
            this.attachImage(CameraSource.Photos);
          },
        },
        {
          text: this.translate.instant('from camera'),
          data: 10,
          handler: () => {
            console.log('camera clicked');
            this.attachImage(CameraSource.Camera);
          },
        },
      ],
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  async attachImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: source,
    });
    this.requestImage = this.sanitizer.bypassSecurityTrustUrl(image.webPath);
    console.log('taken image by camera  :' + this.requestImage);
    await this.uploadImage.getImageConverted(image, 'donation');
  }

  getSelectedDate(date) {
    this.donationForm.value.requestDate = moment(date).format('YYYY-MM-DD');
    console.log('converted date :' + moment(date).format('YYYY-MM-DD'));

    return this.donationForm.value.requestDate;
  }

  loadMap() {
    let latLng = new google.maps.LatLng(
      this.util.userLocation.lat,
      this.util.userLocation.lng
    );

    let styles: google.maps.MapTypeStyle[] = [
      {
        featureType: 'poi',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
    ];

    let mapOptions: google.maps.MapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: styles,
      mapTypeControl: false,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  loadItemPosition() {
    this.plt.ready().then(() => {
      this.focusMap(this.util.userLocation.lat, this.util.userLocation.lng);
      this.addMarker(this.util.userLocation.lat, this.util.userLocation.lng);
    });
  }

  focusMap(lat, lng) {
    let latLng = new google.maps.LatLng(lat, lng);
    this.map.setCenter(latLng);
    this.map.setZoom(12);
  }

  addMarker(lat, lng) {
    
    let latLng = new google.maps.LatLng(lat, lng);

    this.home = new google.maps.Marker({
      map: this.map,
      position: latLng,
      animation: google.maps.Animation.DROP,
      draggable: true,
      icon: './../../../../assets/icon/location-pin-small.svg',
    });
    this.reverseGeocode(this.lat, this.long);
    google.maps.event.addListener(this.home, 'dragend', (event) => {
      //alert(JSON.stringify(event))
      //
      //alert(event.latLng.lat() + '  ' + event.latLng.lng());
      this.lat = event.latLng.lat();
      this.long = event.latLng.lng();
      console.log('new location :' + this.lat + '  ' + this.long);
      //    alert(res.coords.latitude+'   '+res.coords.longitude)
      //  })
      this.reverseGeocode(this.lat, this.long);
    });

    this.reverseGeocode(this.lat, this.long);

    //   google.maps.event.addListener(this.home, 'dragend', (ev){

    //      alert(this.home.getPosition()); // new LatLng-Object after dragend-event...
    // });
  }

  reverseGeocode(lat, lng) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };

    this.nativeGeocoder
      .reverseGeocode(lat, lng, options)
      .then((result: NativeGeocoderResult[]) => {
        //console.log(JSON.stringify(result[0]));
        this.address =
          result[0].countryName +
          ' ' +
          result[0].administrativeArea +
          ' ' +
          result[0].subAdministrativeArea +
          ' ' +
          result[0].locality +
          ' ' +
          result[0].postalCode;
        console.log(this.address);
      })
      .catch((error: any) => console.log(error));
  }

  getAllCities() {
    const userData: UserData = {
      lang: this.languageService.getLanguage(),
    };
    this.util.showLoadingSpinner().then((__) => {
      this.dataService.appData(userData).subscribe(
        (data: AppData) => {
          this.util.dismissLoading();
          if (data.key == 1) {
            this.cities = data.data.cities;
          } else {
            this.util.showMessage(data.msg);
          }
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }

  chooseCity($event) {
    this.donationForm.value.neighborhood = '';
    const cityData: CitysData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
      city_id: $event.target.value,
    };
    this.donationForm.value.city = $event.target.value;
    this.util.showLoadingSpinner().then((__) => {
      this.dataService.getNeighborhoods(cityData).subscribe(
        (data: CitysResponse) => {
          this.util.dismissLoading();
          if (data.key == 1) {
            this.neighborhoods = data.data;
          } else {
            this.util.showMessage(data.msg);
          }
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }

  chooseNeighborhood($event) {
    console.log('Neighborhood : ' + $event.target.value);
    this.donationForm.value.neighborhood = $event.target.value;
  }

  getUserData(userData: UserData) {
    this.auth.userData(userData).subscribe(
      (data: AuthResponse) => {
        if (data.key == 1) {
          console.log('user data :' + JSON.stringify(data.data));
          this.userData = data.data;
        } else {
        }
      },
      (err) => {}
    );
  }

  donate() {
    // this.donationForm.value.lat = this.util.userLocation.lat;
    // this.donationForm.value.lng = this.util.userLocation.lng;

    this.donationForm.value.image = this.general.getDonationImage();

    console.log('donation form : ' + JSON.stringify(this.donationForm.value));
    if(this.donationForm.value.neighborhood!=''){
      const storeOrderData: StoreOrderData = {
        lang: this.languageService.getLanguage(),
        user_id: this.auth.userID.value,
        type: StoreOrderType.volunteer,
        name: this.donationForm.value.userName,
        phone: this.donationForm.value.phoneNumber,
        city_id: this.donationForm.value.city,
        neighborhood_id: this.donationForm.value.neighborhood,
        lat: this.lat,
        lng: this.long,
        date: moment(this.donationForm.value.requestDate).format('YYYY-MM-DD'),
        time: this.donationForm.value.requestTime,
        notes: this.donationForm.value.notices,
        image: this.general.getDonationImage(),
      };


    console.log(' storeOrderData  ' + JSON.stringify(storeOrderData));
    this.util.showLoadingSpinner().then((__) => {
      this.sectionsService.storeOrder(storeOrderData).subscribe(
        (data: GeneralResponse) => {
          if (data.key == 1) {
            // this.util.showMessage(data.msg).then((_) => {
            this.showOrderNotice();
            // });
          } else {
            if (data.msg == 'neighborhood id مطلوب') {
              this.util.showMessage('enter city ');
            } else {
              this.util.showMessage(data.msg);
            }
          }
          this.util.dismissLoading();
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
    }else{
      const storeOrderData: StoreOrderData = {
        lang: this.languageService.getLanguage(),
        user_id: this.auth.userID.value,
        type: StoreOrderType.volunteer,
        name: this.donationForm.value.userName,
        phone: this.donationForm.value.phoneNumber,
        city_id: this.donationForm.value.city,
        
        lat: this.lat,
        lng: this.long,
        date: moment(this.donationForm.value.requestDate).format('YYYY-MM-DD'),
        time: this.donationForm.value.requestTime,
        notes: this.donationForm.value.notices,
        image: this.general.getDonationImage(),
      };


    console.log(' storeOrderData  ' + JSON.stringify(storeOrderData));
    this.util.showLoadingSpinner().then((__) => {
      this.sectionsService.storeOrder(storeOrderData).subscribe(
        (data: GeneralResponse) => {
          if (data.key == 1) {
            // this.util.showMessage(data.msg).then((_) => {
            this.showOrderNotice();
            // });
          } else {
            if (data.msg == 'neighborhood id مطلوب') {
              this.util.showMessage('enter city ');
            } else {
              this.util.showMessage(data.msg);
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
   
  }

  async showOrderNotice() {
    const modal = await this.modalController.create({
      component: NoticeModalPage,
      cssClass: 'my-custom-modal',
      canDismiss: true,
      componentProps: {
        haveButton: true,
        buttonText: 'my-orders',
        noticeText: 'order sent successfully',
      },
    });
    return await modal.present();
  }
}
