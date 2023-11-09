import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentIndexComponent } from './payment-index/payment-index.component';
import { PaymentCreateUpdateComponent } from './payment-create-update/payment-create-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PaymentIndexComponent,
    PaymentCreateUpdateComponent
  ],
  imports: [
    SharedModule,
    PaymentRoutingModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NgSelectModule,
  ]
})
export class PaymentModule { }
