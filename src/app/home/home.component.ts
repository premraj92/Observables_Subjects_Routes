import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CanUserLeaveComponent } from '../prompt-user-to-save-data.guard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, CanUserLeaveComponent {

  userName: FormControl = new FormControl()
  userNameText = ''
  constructor() { }

  ngOnInit(): void {

    this.userName.valueChanges.subscribe((value) => {
        console.log(`User Name entered by user is `, value)
        this.userNameText = value
    })
  }

  canLeave(): boolean {

    if(this.userName.dirty) {
      return window.confirm(`Are you sure you wanna Navigate Away from this page you have unsaved Changes ??`)
    }

    return true
  }
}
