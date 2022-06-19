import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/models/general';
import { NotificationsInfo, NotificationsResponse } from 'src/app/models/notifications';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private httpclient: HttpClient) {}

  showNotification(data: UserData): Observable<NotificationsResponse> {
    return this.httpclient.post<NotificationsResponse>(
      `${environment.BASE_URL}show-notification`,
      data
    );
  }

  deleteNotification(
    data: NotificationsInfo
  ): Observable<NotificationsResponse> {
    return this.httpclient.post<NotificationsResponse>(
      `${environment.BASE_URL}delete-notification`,
      data
    );
  }

}
