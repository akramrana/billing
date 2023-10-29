import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { ValidationService } from 'src/app/services/validation.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-admin-create-update',
  templateUrl: './admin-create-update.component.html',
  styleUrls: ['./admin-create-update.component.scss']
})
export class AdminCreateUpdateComponent implements OnInit {

  id: number = 0;
  title: string = "";
  adminForm: FormGroup | any;
  admin: any;
  private baseRoute = 'v1/admin.php';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _route: ActivatedRoute,
    private toastrService: ToastrService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.title = 'Create';
    this.adminForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      phone: ['', [Validators.required, Validators.pattern(/^\-?\d+((\.|\,)\d+)?$/)]],
      password: [''],
    });

    this._route.params.subscribe((param) => {
      this.id = (param['id'])?param['id']:0;
    });
    if (this.id) {
      this.title = 'Update';
      this.getUpdateData();
    } else {
      this.adminForm.addControl('confirmPassword', new FormControl('', Validators.required));
      this.adminForm.controls['password'].setValidators(Validators.required);
      this.adminForm.setValidators(ValidationService.matchPassword);
      this.adminForm.updateValueAndValidity();
    }
  }

  getUpdateData() {
    this.apiService.readRequest(this.baseRoute, {
      id: this.id,
      _route: "view"
    })
      .pipe(first())
      .subscribe(response => {
        const _data = response.body.data;
        if (_data) {
          this.admin = _data;
          this.adminForm.patchValue({
            name: this.admin.name,
            email: this.admin.email,
            phone: this.admin.phone,
          });
        }
      });
  }

  save(event: Event) {
    Object.keys(this.adminForm.controls).forEach(field => {
      const control = this.adminForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (this.adminForm.valid) {
      try {
        const _form = this.adminForm.value;
        //console.log(_form);
        const postParams = {
          name: _form.name,
          email: _form.email,
          password: _form.password,
          phone: _form.phone,
        };
        //console.log(postParams);
        if (this.id === 0) {
          this.apiService.postRequest(this.baseRoute, { _route: "create" }, postParams)
            .pipe(first())
            .subscribe((response: any) => {
              if (response.status === 1) {
                this.toastrService.success('Admin created successfully!');
                this.router.navigate(['/pages/admin/']);
              } else if (response.status === 0) {
                if (response.errorField === 'email') {
                  this.adminForm.controls['email'].setErrors({ 'dupicateEmail': true });
                }
              } else {
                console.log(response);
              }
            });
        } else {
          this.apiService.postRequest(this.baseRoute, { id: this.id, _route: "update" }, postParams)
            .pipe(first())
            .subscribe((response: any) => {
              console.log('response', response);
              if (response.status === 1) {
                this.toastrService.success('Admin updated successfully!');
                this.router.navigate(['/pages/admin/']);
              } else if (response.status === 0) {
                if (response.errorField === 'email') {
                  this.adminForm.controls['email'].setErrors({ 'dupicateEmail': true });
                }
              } else {
                console.log(response);
              }
            });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

}
