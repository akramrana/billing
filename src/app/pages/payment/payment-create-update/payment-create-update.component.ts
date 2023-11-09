import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { ValidationService } from 'src/app/services/validation.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-payment-create-update',
  templateUrl: './payment-create-update.component.html',
  styleUrls: ['./payment-create-update.component.scss']
})
export class PaymentCreateUpdateComponent implements OnInit {

  id: number = 0;
  title: string = "";
  formGroup: FormGroup | any;
  model: any;
  private baseRoute = 'v1/payment.php';
  private dropdownRoute = 'v1/dropdown.php';
  orderList: any[] = [];
  paymodeList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _route: ActivatedRoute,
    private toastrService: ToastrService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getPaymodeList();
    this.getOrderList();
    this.title = 'Create';
    this.formGroup = this.fb.group({
      orderId: ['', Validators.required],
      paymode: ['', Validators.required],
      amount: ['', Validators.required],
    });

    this._route.params.subscribe((param) => {
      this.id = (param['id']) ? param['id'] : 0;
    });
    if (this.id) {
      this.title = 'Update';
      this.getUpdateData();
    }
  }

  getPaymodeList(){
    this.paymodeList = [];
    this.apiService.readRequest(this.dropdownRoute, {
      _route: "paymode-list"
    })
      .pipe(first())
      .subscribe(response => {
        const _data = response.body;
        if (_data) {
          this.paymodeList = _data;
        }
      });
  }

  getOrderList(){
    this.orderList = [];
    this.apiService.readRequest(this.dropdownRoute, {
      _route: "order-list"
    })
      .pipe(first())
      .subscribe(response => {
        const _data = response.body;
        if (_data) {
          this.orderList = _data;
        }
      });
  }

  getUpdateData() {
    this.apiService.readRequest(this.baseRoute, {
      id: this.id,
      _route: "view"
    })
      .pipe(first())
      .subscribe(response => {
        const _data = response.body;
        //console.log(_data);
        if (_data) {
          this.model = _data;
          this.formGroup.patchValue({
            orderId: this.model.order_id,
            paymode: this.model.paymode,
            amount: this.model.amount,
          });
        }
      });
  }

  save(event: Event) {
    Object.keys(this.formGroup.controls).forEach(field => {
      const control = this.formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (this.formGroup.valid) {
      try {
        const postParams = this.formGroup.value;
        if (this.id === 0) {
          this.apiService.postRequest(this.baseRoute, { _route: "create" }, postParams)
            .pipe(first())
            .subscribe((response: any) => {
              if (response.status === 1) {
                this.toastrService.success('Payment created successfully!');
                this.router.navigate(['/pages/payment/']);
              } else {
                console.log(response);
              }
            });
        } else {
          this.apiService.postRequest(this.baseRoute, { id: this.id, _route: "update" }, postParams)
            .pipe(first())
            .subscribe((response: any) => {
              //console.log('response', response);
              if (response.status === 1) {
                this.toastrService.success('Payment updated successfully!');
                this.router.navigate(['/pages/payment/']);
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
