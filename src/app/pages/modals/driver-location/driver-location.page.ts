import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { Platform } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilitiesService } from '../../../services/utilities/utilities.service';
@Component({
  selector: 'app-driver-location',
  templateUrl: './driver-location.page.html',
  styleUrls: ['./driver-location.page.scss'],
})
export class DriverLocationPage implements OnInit {
  @Input() lat: number;
  @Input() lng: number;
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: google.maps.Map;
  home: google.maps.Marker;
  // lat: number = 31;
  // long: number = 31;
  infowindow = new google.maps.InfoWindow();
  //userType: string;
  constructor(
    private plt: Platform,
    private launchNavigator: LaunchNavigator,
    private auth: AuthService,
    private util: UtilitiesService
  ) {
    // this.center = {
    //   lat: 31,
    //   lng: 31,
    // };
    // this.userType = this.auth.userType.value;
  }

  // async createMap() {
  //   this.newMap = await GoogleMap.create({
  //     id: 'capacitor-google-map',
  //     element: this.mapRef.nativeElement,
  //     apiKey: environment.Google_API_KEY,
  //     config: {
  //       center: this.center,
  //       zoom: 8,
  //     },
  //   });
  //   this. addMarker();
  // }

  // async addMarker() {
  //   // Add a marker to the map
  //   await this.newMap.addMarker({
  //     coordinate: this.center,

  //     iconUrl:'./../../../../assets/icon/location_pin.svg'
  //   });
  //   await this.newMap.setCamera({
  //     coordinate: this.center,
  //   });
  // }
  ngAfterViewInit() {
    this.loadMap();
    this.loadItemPosition();
  }
  ngOnInit() {}
  loadMap() {
    let latLng = new google.maps.LatLng(this.lat, this.lng);

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
      this.focusMap(this.lat, this.lng);
      this.addMarker(this.lat, this.lng);
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
      icon: './../../../../assets/icon/location_pin.svg',
    });

    // if (this.auth.userType.value == 'provider') {
    //   google.maps.event.addListener(this.home, 'click', (event) => {
    //     console.log('marker clicked');
    //     this.trackOnMap();
    //     // let opt
    //   });
    // }
  }
  trackOnMap() {
    // let options: LaunchNavigatorOptions = {
    //   start: [this.util.userLocation.lat, this.util.userLocation.lng],
    //   app: this.launchNavigator.APP.GOOGLE_MAPS,// APPLE_MAPS
    // };

    // this.launchNavigator
    //   .navigate(
    //     [this.util.userLocation.lat, this.util.userLocation.lng],
    //     options
    //   )
    //   .then(
    //     (success) => console.log('Launched navigator'),
    //     (error) => console.log('Error launching navigator', error)
    //   );

    this.launchNavigator
      .isAppAvailable(this.launchNavigator.APP.GOOGLE_MAPS)
      .then((isAvailable: any) => {
        var app;
        if (isAvailable) {
          app = this.launchNavigator.APP.GOOGLE_MAPS;
        } else {
          console.warn(
            'Google Maps not available - falling back to user selection'
          );
          app = this.launchNavigator.APP.USER_SELECT;
        }
        this.launchNavigator.navigate([this.lat, this.lng], {
          app: app,
          start: [this.util.userLocation.lat, this.util.userLocation.lng],
        });
      });
  }
}
