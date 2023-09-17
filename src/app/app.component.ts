import { Component } from '@angular/core';
import {User} from "./shared/models/user";
import {AuthService} from "./shared/services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'e-service-front';
  user: User;
  status: boolean = false;

  clickEvent(){
    this.status = !this.status;
  }

  constructor(private authService: AuthService, private router: Router) {
    this.authService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.authService.logout();
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
