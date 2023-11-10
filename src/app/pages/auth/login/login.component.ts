import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigSettings } from 'src/app/config/config.settings';
import { ApiService } from 'src/app/services/api.service';
import { ValidationService } from 'src/app/services/validation.service';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;
  submitted: boolean = false;
  private baseRoute = 'v1/login.php';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastrService: ToastrService,
    private configSettings: ConfigSettings,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required]],
    });
  }

  login(event: Event) {
    this.submitted = true
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
    if (this.loginForm.dirty && this.loginForm.valid) {
      try {
        const _form = this.loginForm.value;
        const postParams = {
          email: _form.email,
          password: _form.password,
        };
        this.apiService.postRequest(this.baseRoute, { _route: 'login' }, postParams)
          .pipe(first())
          .subscribe(response => {
            //console.log(response)
            if (response.status === 1) {
              this.configSettings.setLoginUserData(response.user);
              this.toastrService.success('Logged in');
              //
              this.authService.isUserLoggedIn();
              //
              this.router.navigate(['/pages/dashboard']);
            } else if (response.status === 0) {
              this.toastrService.error(response.message);
              this.loginForm.patchValue({
                email: _form.email,
                password: '',
              });
            } else {
              console.log(response);
            }
          });
      } catch (e) {
        console.log(e);
      }
    }
  }

}
