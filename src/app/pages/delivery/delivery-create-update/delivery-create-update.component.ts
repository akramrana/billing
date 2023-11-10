import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { ValidationService } from 'src/app/services/validation.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-delivery-create-update',
  templateUrl: './delivery-create-update.component.html',
  styleUrls: ['./delivery-create-update.component.scss']
})
export class DeliveryCreateUpdateComponent implements OnInit {

  id: number = 0;
  title: string = "";
  formGroup: FormGroup | any;
  delivery: any;
  private baseRoute = 'v1/delivery.php';
  private dropdownRoute = 'v1/dropdown.php';
  businessList: any[] = [];
  colourList: any[] = [];
  sizeList: any[] = [];
  nextDeliveryNumber: string = "";
  arrayItems: FormArray | any;
  orderList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _route: ActivatedRoute,
    private toastrService: ToastrService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.title = 'Create';

    this.getColourList();
    this.getSizeList();
    this.getOrderList();

    this.formGroup = this.fb.group({
      deliveryNumber: ['', Validators.required],
      deliveryMan: ['', [Validators.required]],
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
      this.getNextDeliveryNumber();
    }
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
      price: [],
      quantity: [],
      message: [],
      date: [],
      orderId: [],
    })
    this.arrayItems.push(items);
  }

  removeItem(i: number) {
    if (this.arrayItems.length > 0) {
      this.arrayItems.removeAt(i);
    }
  }

  getNextDeliveryNumber() {
    this.apiService.readRequest(this.baseRoute, {
      _route: "next-delivery-number"
    })
      .pipe(first())
      .subscribe(response => {
        const _data = response.body;
        if (_data) {
          //console.log(_data);
          this.nextDeliveryNumber = _data;
          this.formGroup.patchValue({
            deliveryNumber: this.nextDeliveryNumber,
          })
        }
      });
  }

  months() {
    let months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months;
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
          this.delivery = _data;
          this.formGroup.patchValue({
            deliveryNumber: this.delivery.delivery_number,
            deliveryMan: this.delivery.delivery_man,
          });
          if(this.delivery.items && this.delivery.items.length > 0){
            for(let oi of this.delivery.items){
              let items = this.fb.group({
                colourId: [oi.colour_id],
                sizeId: [oi.size_id],
                price: [oi.price],
                quantity: [oi.quantity],
                message: [oi.message],
                date: [oi.datetime],
                orderId: [oi.order_id],
              })
              this.arrayItems.push(items);
            }
          }
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

  save(event: Event) {
    Object.keys(this.formGroup.controls).forEach(field => {
      const control = this.formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (this.formGroup.valid) {
      try {
        let months = this.months();
        const postParams = this.formGroup.value;
        //
        if (this.id === 0) {
          this.apiService.postRequest(this.baseRoute, { _route: "create" }, postParams)
            .pipe(first())
            .subscribe((response: any) => {
              if (response.status === 1) {
                this.toastrService.success('Delivery created successfully!');
                this.router.navigate(['/pages/delivery/']);
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
                this.toastrService.success('Delivery updated successfully!');
                this.router.navigate(['/pages/delivery/']);
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
