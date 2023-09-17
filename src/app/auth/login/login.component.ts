import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {first} from "rxjs";
import {AlertService} from "../../shared/services";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  returnUrl: string = 'dashboard';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
              private authService: AuthService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    console.log('the form to save ', this.form);
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    /*if (this.form.invalid) {
      return;
    }*/

    this.loading = true;
    // calling the service back end pour login
    this.authService
      .login(this.form.get('username')?.value, this.form.get('password')?.value)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log('data after login ', data)
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          console.log('error  ', error);
          this.alertService.error(error.error.message);
          this.loading = false;
        }
      );
  }
}
