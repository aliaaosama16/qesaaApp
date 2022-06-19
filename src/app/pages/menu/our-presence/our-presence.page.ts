import { UtilitiesService } from './../../../services/utilities/utilities.service';
import { GeneralSectionResponse, UserData } from './../../../models/general';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AppDataService } from 'src/app/services/app-data/app-data.service';
import { AppData, AppDataOptions } from 'src/app/models/data';
import { LanguageService } from 'src/app/services/language/language.service';
import { DataService } from 'src/app/services/data/data.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-our-presence',
  templateUrl: './our-presence.page.html',
  styleUrls: ['./our-presence.page.scss'],
})
export class OurPresencePage implements OnInit {
  ourLocations: GeneralSectionResponse[];
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: google.maps.Map;
  home: google.maps.Marker;
  lat: number = 0;
  long: number = 0;
  infowindow = new google.maps.InfoWindow();
  locations: GeneralSectionResponse[];
  constructor(
    private plt: Platform,
    private appData: AppDataService,
    private languageService: LanguageService,
    private util: UtilitiesService,
    private dataService: DataService,
    private auth:AuthService
  ) {
    //this.getLocations();
  }

  getLocations() {}

  ngAfterViewInit() {
    const userData: UserData = {
      lang: this.languageService.getLanguage(),
      //user_id: this.auth.userID.value,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.dataService.appData(userData).subscribe(
        (data: AppData) => {
          this.util.dismissLoading();
          if (data.key == 1) {
            this.locations = data.data.our_location;

            for (let i = 0; i < this.locations.length; i++) {
              this.loadMap(this.locations[i].lat, this.locations[i].lng);
              this.loadItemPosition(
                this.locations[i].lat,
                this.locations[i].lng,
                this.locations[i].title
              );
            }

          //  console.log(' this.locations  :' + JSON.stringify(this.locations));
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
  ngOnInit() {}
  loadMap(lat, long) {
    let latLng = new google.maps.LatLng(lat, long);

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
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: styles,
      mapTypeControl: false,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  loadItemPosition(lat, long, title) {
    this.plt.ready().then(() => {
      //for(let i=0;i<this.ourLocations.length;i++){
      this.focusMap(lat, long);
      this.addMarker(lat, long, title);
      // }
    });
  }

  focusMap(lat, lng) {
    let latLng = new google.maps.LatLng(lat, lng);
    this.map.setCenter(latLng);
    this.map.setZoom(12);
  }

  addMarker(lat, lng, title) {
    let latLng = new google.maps.LatLng(lat, lng);

    this.home = new google.maps.Marker({
      map: this.map,
      position: latLng,
      animation: google.maps.Animation.DROP,
      icon: './../../../../assets/icon/location_pin.svg',
      title: title,
    });

    let infoWindow = new google.maps.InfoWindow({
      content: title
    });
    this.home.addListener('click', () => {
      infoWindow.open(this.map, this.home);
    });
  
  }
}
