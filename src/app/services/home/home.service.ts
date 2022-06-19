import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserData } from 'src/app/models/general';
import { HomeResponse } from 'src/app/models/home';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpclient: HttpClient) {}

  home(data: UserData): any {
    return this.httpclient.post<HomeResponse>(
      `${environment.BASE_URL}home`,
      data
    ).pipe(catchError(val => of(`I caught: ${val}`)));;
  }
}
