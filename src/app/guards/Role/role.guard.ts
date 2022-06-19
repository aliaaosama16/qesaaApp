import { ModalController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  isLogined: boolean;
  constructor(
    private auth: AuthService,
    private router: Router,
    private util: UtilitiesService,
    private modalController: ModalController
  ) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const userType = await Storage.get({ key: 'qesaa-UserType' });
    this.auth.userType.next(userType.value);
    console.log('this.auth.userType.value :' + this.auth.userType.value);
    if (userType.value == 'provider') {
      this.util.showMessage('requests are available for cleints only');
      return false;
    } else {
      return true;
    }
  }
}

// const userType = await Storage.get({ key: 'qesaa-UserType' });
// this.auth.userType.next(userType.value);
// console.log('this.auth.userType.value :' + this.auth.userType.value);
// if (this.auth.userType.value == 'provider') {
//   this.updateProviderLocation();
// } else {
//   this.sectionsService.setCartCount();
// }
