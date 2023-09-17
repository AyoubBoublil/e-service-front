import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthComponent} from "./auth.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthRoutingModule} from "./auth-routing.module";
import {AppModule} from "../app.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule, FormsModule, SharedModule],
  providers: [],
  bootstrap: []
})
export class AuthModule { }
