import { Component } from '@angular/core';
import {User} from "./models/user";
import {AuthService} from "./services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'e-service-front';
  user: User;

  constructor(private authService: AuthService) {
    this.authService.user.subscribe(x => this.user = x);
  }


}
