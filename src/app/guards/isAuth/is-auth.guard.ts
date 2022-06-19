import { LoginModalPage } from './../../pages/modals/login-modal/login-modal.page';
import { ModalController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { Storage } from '@capacitor/storage';
import { CustomModalPage } from 'src/app/pages/modals/custom-modal/custom-modal.page';

@Injectable({
  providedIn: 'root',
})
export class IsAuthGuard implements CanActivate {
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
    const loginStatus = await Storage.get({ key: 'qesaa-activation-status' });
    console.log('login status' + loginStatus.value);
    if (loginStatus.value ) {
      this.auth.isLogined();
      return true;
    } else {
      // this.router.navigateByUrl('/login-modal');
      this.presentModal();
      return false;
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CustomModalPage,
      cssClass: 'my-custom-modal',
      canDismiss:true,
      componentProps:{
        modalType:'authentication'
      }
    });
    return await modal.present();
  }
}
