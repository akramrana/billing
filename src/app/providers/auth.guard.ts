import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import {ConfigSettings} from '../config/config.settings';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private configSettings: ConfigSettings,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return this.checkLogin(state.url);
  }
  // CheckLogin
  checkLogin(url: string): Promise<boolean> | boolean {
    let currentUser: any;
    if (isPlatformBrowser(this.platformId)) {
      currentUser = JSON.parse(this.configSettings.getLoginUserData());
      //console.log(currentUser);
    }
    if (currentUser) {
      if (url === '/auth/login') {
        // Navigate to the login page with extras
        this.router.navigate(['/pages/admin']);
        return false;
      }
      return true;
    } else {
      if (url === '/auth/login') {
        return true;
      }
    }
    // Navigate to the login page with extras
    this.router.navigate(['/auth/login']);
    return false;
  }
}