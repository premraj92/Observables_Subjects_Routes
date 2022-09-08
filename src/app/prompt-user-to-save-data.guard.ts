import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeComponent } from './home/home.component';

export interface CanUserLeaveComponent {
  canLeave(): boolean
}

@Injectable({
  providedIn: 'root'
})
export class PromptUserToSaveDataGuard implements CanDeactivate<CanUserLeaveComponent> {

  canDeactivate(
    component: CanUserLeaveComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(component.canLeave) {
        return component.canLeave()
      }

      return true;
    }




  // // the below Implementation is the same as above Logic but the above logic can be reused in many components since the Check to determine whether the component has Any Unsaved Data is Done in the respective component
  // // but in the below implmentation we have that check here so we can't reuse it

  // canDeactivate(
  //   component: HomeComponent,
  //   currentRoute: ActivatedRouteSnapshot,
  //   currentState: RouterStateSnapshot,
  //   nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  //     if(component.userName.dirty) {
  //       return window.confirm(`Are you sure you wanna Navigate Away from this page you have unsaved Changes ??`)
  //     }

  //     return true;
  // }

}
