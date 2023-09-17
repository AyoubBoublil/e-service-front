import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/services";
import {first} from "rxjs";
import {AlertService} from "../../shared/services/alert.service";
import {User} from "../../shared/models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log('the form to save ', this.form);

    // reset alerts on submit


    // stop here if form is invalid
    /*if (this.form.invalid) {
      return;
    }*/

    this.loading = true;
    // calling service backend to register a new user
    let user: User = new User();
    user.firstName = this.form.get('firstName')?.value;
    user.lastName = this.form.get('lastName')?.value;
    user.email = this.form.get('email')?.value;
    user.phone = this.form.get('phone')?.value;
    user.password = this.form.get('password')?.value;
    this.authService
      .register(user)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Registration successful', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        (error) => {
          console.log(error);
          this.alertService.error(error.error.errors);
          this.loading = false;
        }
      );
  }
}
