import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import {
  CitysData,
  CountryData,
  GeneralResponse,
  GeneralSectionResponse,
  ImageInfo,
  Language,
  UserData,
} from 'src/app/models/general';
import { LanguageService } from '../language/language.service';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { UtilitiesService } from '../utilities/utilities.service';
import { Intro } from 'src/app/models/intro';
import {
  SlideData,
  SlideResponse,
  StaticPageData,
  StaticPageResponse,
} from 'src/app/models/staticPage';
import { ContactUsData } from 'src/app/models/contactUs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  familiesBasicImage: string = '';
  familiesProductImage: string = '';
  profileImage: string = '';
  donationImage: string = '';

  constructor(private httpclient: HttpClient) {}

  setFamiliesBasicImage(image) {
    this.familiesBasicImage = image;
  }
  getFamiliesBasicImage() {
    return this.familiesBasicImage;
  }

  setFamiliesProductImage(image) {
    this.familiesProductImage = image;
  }
  getFamiliesProductImage() {
    return this.familiesProductImage;
  }

  setProfileImage(image) {
    this.profileImage = image;
  }
  getProfileImage() {
    return this.profileImage;
  }

  setDonationImage(image) {
    this.donationImage = image;
  }
  getDonationImage() {
    return this.donationImage;
  }

  intro(data: Language): Observable<Intro> {
    return this.httpclient.post<Intro>(`${environment.BASE_URL}intro`, data);
  }

  staticPages(data: StaticPageData): Observable<StaticPageResponse> {
    return this.httpclient.post<StaticPageResponse>(
      `${environment.BASE_URL}page`,
      data
    );
  }

  contactUs(data: ContactUsData): Observable<GeneralResponse> {
    return this.httpclient.post<GeneralResponse>(
      `${environment.BASE_URL}contact-us`,
      data
    );
  }

  getSliders(data: SlideData): Observable<SlideResponse> {
    return this.httpclient.post<SlideResponse>(
      `${environment.BASE_URL}sliders`,
      data
    );
  }

  // data(data: UserData): Observable<SectionsResponse> {
  //   return this.httpclient.post<SectionsResponse>(
  //     `${environment.BASE_URL}sections`,
  //     data
  //   );
  // }

  getCitiesByCountryID(data: CountryData): Observable<GeneralSectionResponse> {
    return this.httpclient.post<GeneralSectionResponse>(
      `${environment.BASE_URL}cities`,
      data
    );
  }

  // getNeighborhoodsByCityID(data: CitysData): Observable<CountryResponse> {
  //   return this.httpclient.post<CountryResponse>(
  //     `${environment.BASE_URL}neighborhoods`,
  //     data
  //   );
  // }
}
