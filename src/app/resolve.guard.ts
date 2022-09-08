import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve
  , RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveGuard implements Resolve<any> {

  constructor (private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.userService.isUserDataFetched()
                             .then((value) => {
                                console.log(`Test data : ${value}`)
                                return value
                             })
  }

}
