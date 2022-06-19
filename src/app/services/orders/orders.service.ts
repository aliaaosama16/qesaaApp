import { Observable } from 'rxjs';
import { Order, OrderData, OrderListResponse, OrderResponse } from './../../models/order';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from 'src/app/models/general';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private httpclient: HttpClient) {}

  showAllorders(data: UserData): Observable<OrderListResponse> {
    return this.httpclient.post<OrderListResponse>(
      `${environment.BASE_URL}show-all-orders`,
      data
    );
  }

  showOrderByOederID(data: OrderData): Observable<OrderResponse> {
    return this.httpclient.post<OrderResponse>(
      `${environment.BASE_URL}show-order`,
      data
    );
  }
}
