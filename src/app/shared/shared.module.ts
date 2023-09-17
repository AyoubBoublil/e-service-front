import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertComponent} from './components/alert/alert.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "./interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertService, AuthService} from "./services";

@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    AlertComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    AlertService,
    AuthService
  ],
})
export class SharedModule {
}
