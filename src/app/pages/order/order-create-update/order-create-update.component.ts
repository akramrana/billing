import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { ValidationService } from 'src/app/services/validation.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-order-create-update',
  templateUrl: './order-create-update.component.html',
  styleUrls: ['./order-create-update.component.scss']
})
export class OrderCreateUpdateComponent implements OnInit {

  id: number = 0;
  title: string = "";
  formGroup: FormGroup | any;
  order: any;
  private baseRoute = 'v1/order.php';
  private dropdownRoute = 'v1/dropdown.php';
  businessList: any[] = [];
  colourList: any[] = [];
  sizeList: any[] = [];
  nextOrderNumber: string = "";
  arrayItems: FormArray | any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _route: ActivatedRoute,
    private toastrService: ToastrService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getBusinessList();
    this.getColourList();
    this.getSizeList();
    this.title = 'Create';
    this.formGroup = this.fb.group({
      orderNumber: ['', Validators.required],
      businessId: ['', [Validators.required]],
      itemsArray: this.fb.array([]),
    });

    this.arrayItems = this.formGroup.get('itemsArray') as FormArray;

    this._route.params.subscribe((param) => {
      this.id = (param['id']) ? param['id'] : 0;
    });
    if (this.id) {
      this.title = 'Update';
      this.getUpdateData();
    } else {
      this.getNextOrderNumber();
    }
  }

  log(data: any) {
    console.log(data);
  }

  get valueFormGroup() {
    return this.formGroup.get('itemsArray') as FormArray;
  }

  addItems() {
    let items = this.fb.group({
      colourId: [],
      sizeId: [],
      finalPrice: [],
      regularPrice: [],
      quantity: [],
      message: [],
    })
    this.arrayItems.push(items);
  }

  removeItem(i: number) {
    if (this.arrayItems.length > 0) {
      this.arrayItems.removeAt(i);
    }
  }

  getBusinessList() {
    this.businessList = [];
    this.apiService.readRequest(this.dropdownRoute, {
      _route: "business-list"
    })
      .pipe(first())
      .subscribe(response => {
        const _data = response.body;
        if (_data) {
          this.businessList = _data;
        }
      });
  }

  getSizeList() {
    this.sizeList = [];
    this.apiService.readRequest(this.dropdownRoute, {
      _route: "size-list"
    })
      .pipe(first())
      .subscribe(response => {
        const _data = response.body;
        if (_data) {
          this.sizeList = _data;
        }
      });
  }

  getNextOrderNumber() {
    this.apiService.readRequest(this.baseRoute, {
      _route: "next-order-number"
    })
      .pipe(first())
      .subscribe(response => {
        const _data = response.body;
        if (_data) {
          //console.log(_data);
          this.nextOrderNumber = _data;
          this.formGroup.patchValue({
            orderNumber: this.nextOrderNumber,
          })
        }
      });
  }

  getColourList() {
    this.colourList = [];
    this.apiService.readRequest(this.dropdownRoute, {
      _route: "colour-list"
    })
      .pipe(first())
      .subscribe(response => {
        const _data = response.body;
        if (_data) {
          this.colourList = _data;
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
        if (_data) {
          this.order = _data;
          this.formGroup.patchValue({
            orderNumber: this.order.orderNumber,
            businessId: this.order.businessId,
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
                this.toastrService.success('Order created successfully!');
                this.router.navigate(['/pages/order/']);
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
                this.toastrService.success('Order updated successfully!');
                this.router.navigate(['/pages/order/']);
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
