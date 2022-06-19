import { UserData } from './../../models/general';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { FamilyData, FamilyDataResponse, FamilyListResponse } from 'src/app/models/family';

@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  constructor(private httpclient: HttpClient) {}

  //  providers take userdata

  providers(data: UserData): Observable<FamilyListResponse> {
    return this.httpclient.post<FamilyListResponse>(
      `${environment.BASE_URL}providers`,
      data
    );
  }
  // show-provider  provider_id

  showProvider(data: FamilyData): Observable<FamilyDataResponse> {
    return this.httpclient.post<FamilyDataResponse>(
      `${environment.BASE_URL}show-provider`,
      data
    );
  }
}
