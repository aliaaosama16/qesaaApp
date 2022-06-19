import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class ShowBoardingPageGuard implements CanActivate {
  opened: boolean = false;
  constructor(private router: Router) {}
  async canActivate(_route: ActivatedRouteSnapshot): Promise<boolean> {
    const val = await Storage.get({ key: 'qessa-openBoarding' });
    console.log('openBoarding value :' + val.value);
    console.log('opened is ' + this.opened);
    if (val.value == null) {
      this.opened = true;
    } else {
      this.router.navigate(['tabs']);
      this.opened = false;
    }
    return this.opened;
  }
}
