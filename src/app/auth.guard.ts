import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // your logic to decide whether this route should be activated or NOT
      let loggedInStatus = false
      this.authService.isUserLoggedIn()
                      .subscribe({
                        next: (value) => value ? loggedInStatus = true : loggedInStatus
                      })

      if(loggedInStatus) return true

      window.alert('You are not allowed to visit this page')
      return false
  }

}
