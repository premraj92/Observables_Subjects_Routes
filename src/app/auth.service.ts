import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isUserLoggedIn() {
    // implement your actual API call for user login here
    return new Observable((observer) => {
      observer.next(true)
    })
  }
}
