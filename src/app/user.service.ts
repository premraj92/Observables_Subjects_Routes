import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  isUserDataFetched() {
    // return [
    //   {name: 'Jaison', age: 30, employee: 'Yes'},
    //   {name: 'Bison', age: 40, employee: 'No'},
    //   {name: 'Tyson', age: 50, employee: 'Yes'}
    // ]
     return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([
              {name: 'Jaison', age: 30, employee: 'Yes'},
              {name: 'Bison', age: 40, employee: 'No'},
              {name: 'Tyson', age: 50, employee: 'Yes'}
            ])
          }, 3000)
      })
  }
}
