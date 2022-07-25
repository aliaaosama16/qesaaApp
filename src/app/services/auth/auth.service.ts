import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ActivationData,
  AuthResponse,
  LoginData,
  LogOutData,
  RegisterData,
  UpdateUserData,
} from 'src/app/models/auth';
import {
  ChangePasswordData,
  ForgetPasswordData,
} from 'src/app/models/forgetPassword';
import { GeneralResponse, UserData } from 'src/app/models/general';
import { environment } from 'src/environments/environment.prod';
import { Storage } from '@capacitor/storage';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from '../language/language.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationsResponse } from 'src/app/models/notifications';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = new BehaviorSubject(false);
  userCanBuyFromMarket = new BehaviorSubject(false);
  userType = new BehaviorSubject('');
  userID = new BehaviorSubject(0);
  noOfNotifications = new BehaviorSubject(0);
  userToken: string = '';
  providerCallBackID: string;
  constructor(
    private httpclient: HttpClient,
    private languageService: LanguageService,
    private userNotifications: NotificationsService
  ) {}

  storeStatusAfterRegisteration(data: AuthResponse) {
    this.storeToken(data.data?.api_token);
    this.store('qesaa-activation-status', data.data.is_active);
    this.store('qesaa-confirmation-status', data.data.is_confirmed);
    this.setUserID(data.data.id);
  }

  storeStatusAfterLogin(data: AuthResponse) {
    this.isLogined(data?.data?.is_login);
    this.setUserID(data?.data?.id);
    this.storeToken(data?.data?.api_token);
    this.storeIsLoginStatus(data?.data?.is_active);
    this.storeActivationStatus(data?.data?.is_active);
    this.storeUserId(data?.data?.id);
    this.storeUserType(data?.data?.user_type);
    this.setNoOfNotifications(data?.data?.id);
    this.canBuyFromMarket(data?.data?.see_family);
  }

  async storeActivationStatus(status: boolean) {
    await Storage.set({
      key: 'qesaa-activation-status',
      value: status.toString(),
    });
  }

  async storeIsLoginStatus(status: boolean) {
    await Storage.set({
      key: 'qesaa-is-login-status',
      value: status.toString(),
    });
  }

  async canBuyFromMarket(status: any) {
    this.userCanBuyFromMarket.next(status);
    await Storage.set({
      key: 'qesaa-CanBuy',
      value: status,
    });
  }

  async storeUserType(type: string) {
    await Storage.set({
      key: 'qesaa-UserType',
      value: type,
    });
    this.userType.next(type);
  }

  async storeUserId(id: number) {
    await Storage.set({
      key: 'qesaa-UserID',
      value: id.toString(),
    });
  }

  async removeRegistrationData() {
    this.isLogout();
    this.removeToken();
    //this.removeUserID();
    this.noOfNotifications.next(0);
    await Storage.remove({ key: 'qesaa-UserID' });
    await Storage.remove({ key: 'qesaa-UserType' });
    await Storage.remove({ key: 'qesaa-activation-status' });
    await Storage.remove({ key: 'qesaa-confirmation-status' });
    await Storage.remove({ key: 'qesaa-status' });
    //await Storage.clear();
  }

  isLogined(loginStatus: boolean) {
    this.isAuthenticated.next(loginStatus);
  }

  isLogout() {
    this.isAuthenticated.next(false);
  }

  setUserID(userID: number) {
    console.log('set id to behavour sybject ' + userID);
    this.userID.next(userID);
  }

  removeUserID() {
    this.userID.next(0);
  }

  removeUserType() {
    this.userType.next('');
  }

  async getStoredUserID() {
    const val = await Storage.get({ key: 'qesaa-UserID' });
    this.setUserID(parseInt(val.value));
    this.setNoOfNotifications(parseInt(val.value));
  }

  setNoOfNotifications(userId: number) {
    const userData: UserData = {
      lang: this.languageService.getLanguage(),
      user_id: userId,
    };
    this.userNotifications.showNotification(userData).subscribe(
      (data: NotificationsResponse) => {
        if (data.key == 1) {
          console.log('user No Of Notifications :' + data?.data?.length);
          this.noOfNotifications.next(data?.data?.length);
        }
      },
      (err) => {}
    );
  }

  getNoOfNotifications(): Observable<number> {
    return this.noOfNotifications.asObservable();
  }

  getUserIDObservable(): Observable<number> {
    return this.userID.asObservable();
  }

  getLoginedObservable(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getUserMarketStatus(): Observable<boolean> {
    return this.userCanBuyFromMarket.asObservable();
  }

  async storeToken(token: string) {
    await Storage.set({
      key: 'qesaa-USER-TOKEN',
      value: token,
    });
  }

  async removeToken() {
    await Storage.remove({
      key: 'qesaa-USER-TOKEN',
    });
  }

  async store(key: any, value: any) {
    await Storage.set({
      key: key,
      value: value,
    });
  }

  async getUserToken() {
    const val = await Storage.get({ key: 'qesaa-USER-TOKEN' });
    this.userToken = val.value;
  }

  setProviderLocationID(id: string) {
    this.providerCallBackID = id;
  }

  getProviderLocationID() {
    return this.providerCallBackID;
  }

  userData(data: UserData): Observable<AuthResponse> {
    return this.httpclient.post<AuthResponse>(
      `${environment.BASE_URL}show-user`,
      data
    );
  }

  updateUserData(data: UpdateUserData): Observable<AuthResponse> {
    return this.httpclient.post<AuthResponse>(
      `${environment.BASE_URL}update-user`,
      data
    );
  }

  login(data: LoginData): Observable<AuthResponse> {
    return this.httpclient.post<AuthResponse>(
      `${environment.BASE_URL}login`,
      data
    );
  }

  register(data: RegisterData): Observable<AuthResponse> {
    return this.httpclient.post<AuthResponse>(
      `${environment.BASE_URL}register`,
      data
    );
  }

  activeAccount(data: ActivationData): Observable<GeneralResponse> {
    return this.httpclient.post<GeneralResponse>(
      `${environment.BASE_URL}active-account`,
      data
    );
  }

  resendCode(data: UserData): Observable<GeneralResponse> {
    return this.httpclient.post<GeneralResponse>(
      `${environment.BASE_URL}resend-code`,
      data
    );
  }

  logout(data: LogOutData): Observable<AuthResponse> {
    return this.httpclient.post<AuthResponse>(
      `${environment.BASE_URL}logout`,
      data
    );
  }

  forgetPassword(data: ForgetPasswordData): Observable<AuthResponse> {
    return this.httpclient.post<AuthResponse>(
      `${environment.BASE_URL}forget-password`,
      data
    );
  }

  changePassword(data: ChangePasswordData): Observable<AuthResponse> {
    return this.httpclient.post<AuthResponse>(
      `${environment.BASE_URL}reset-password`,
      data
    );
  }

  removeAccount(data: LogOutData): Observable<AuthResponse> {
    return this.httpclient.post<AuthResponse>(
      `${environment.BASE_URL}destory-user`,
      data
    );
  }
}
