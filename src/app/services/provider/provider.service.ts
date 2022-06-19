import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse, UserData } from 'src/app/models/general';
import {
  OrderData,
  OrderListResponse,
  OrderResponse,
} from 'src/app/models/order';
import { ChangeStatusData, LocationData } from 'src/app/models/provider';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(private httpclient: HttpClient) {}

  updateLocation(data: LocationData): Observable<GeneralResponse> {
    return this.httpclient.post<GeneralResponse>(
      `${environment.BASE_URL}update-location`,
      data
    );
  }

  showAllProviderOrders(data: UserData): Observable<OrderListResponse> {
    return this.httpclient.post<OrderListResponse>(
      `${environment.BASE_URL}show-all-provider-orders`,
      data
    );
  }
  getOrderByID(data: OrderData): Observable<OrderResponse> {
    return this.httpclient.post<OrderResponse>(
      `${environment.BASE_URL}show-order`,
      data
    );
  }

  // change-order-status

  changeOrderStatus(data: ChangeStatusData): Observable<GeneralResponse> {
    return this.httpclient.post<GeneralResponse>(
      `${environment.BASE_URL}change-order-status`,
      data
    );
  }
}
