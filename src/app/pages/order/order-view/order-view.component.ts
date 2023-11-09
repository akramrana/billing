import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {

  id: number = 0;
  title: string = "";
  formGroup: FormGroup | any;
  order: any;
  private baseRoute = 'v1/order.php';
  private dropdownRoute = 'v1/dropdown.php';
  statusList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _route: ActivatedRoute,
    private toastrService: ToastrService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getStatus();
    this.title = 'View';
    this._route.params.subscribe((param) => {
      this.id = (param['id']) ? param['id'] : 0;
    });
    if (this.id) {
      this.getViewData();
      this.formGroup = this.fb.group({
        orderId: [this.id],
        statusId: [null, Validators.required],
        comment: [],
      });
    }
  }

  getStatus() {
    this.statusList = [];
    this.apiService.readRequest(this.dropdownRoute, {
      _route: "status-list"
    })
      .pipe(first())
      .subscribe(response => {
        const _data = response.body;
        if (_data) {
          this.statusList = _data;
        }
      });
  }

  getViewData() {
    this.apiService.readRequest(this.baseRoute, {
      id: this.id,
      _route: "view"
    })
      .pipe(first())
      .subscribe(response => {
        const _data = response.body;
        //console.log(_data);
        if (_data) {
          this.order = _data;
        }
      });
  }

  changeStatus($event: any) {
    Object.keys(this.formGroup.controls).forEach(field => {
      const control = this.formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (this.formGroup.valid) {
      try {
        const postParams = this.formGroup.value;
        //console.log(postParams);
        this.apiService.postRequest(this.baseRoute, { _route: 'change-status' }, postParams)
          .pipe(first())
          .subscribe(response => {
            if (response.status === 1) {
              this.toastrService.success('Status updated successfully!');
              this.formGroup.patchValue({
                statusId: "",
                comment: ""
              });
              this.getViewData();
            } else if (response.status === 0) {
              this.toastrService.error(response.message);
            }
          });
      } catch (e) {
        // console.log(e);
      }
    }
  }

}
