import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UtilitiesService } from '../utilities/utilities.service';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private util: UtilitiesService) {}
  networkStatus = new BehaviorSubject(false);

  listenToNetwork() {
    Network.addListener('networkStatusChange', (status) => {
      console.log('Network status changed', status);
      if (!status) {
        this.util.showMessage('connection error');
      }
      this.networkStatus.next(status.connected);
    });
  }

  getNetworkStatus() {
    Network.getStatus().then((status) => {
      if (!status) {
        this.util.showMessage('connection error');
      }
      this.networkStatus.next(status.connected);
    });
  }

  getNetworkStatusObservable(): Observable<boolean> {
    return this.networkStatus.asObservable();
  }
}
