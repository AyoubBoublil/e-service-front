import { Component } from '@angular/core';
import {User} from "../models/user";
import {AuthService} from "../services";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  user: User;

  status: boolean = false;

  clickEvent(){
    this.status = !this.status;
  }

  constructor(private authService: AuthService) {
    this.user = this.authService.userValue;
    console.log('From page home ', this.user)
  }

  logout() {
    this.authService.logout();
  }
}
