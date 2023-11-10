import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ConfigSettings } from '../config/config.settings';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private configSettings: ConfigSettings,
  ) {
    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    let user = JSON.parse(this.configSettings.getLoginUserData());
    //console.log(user);
    if (user && user.token != '') {
      this.loggedIn.next(true);
    }else{
      this.loggedIn.next(false);
    }
  }

  logout() {
    this.configSettings.removeLoginUserData();
    this.loggedIn.next(false);
  }
}
