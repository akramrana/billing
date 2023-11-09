import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderIndexComponent } from './order-index/order-index.component';
import { OrderCreateUpdateComponent } from './order-create-update/order-create-update.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [
    OrderIndexComponent,
    OrderCreateUpdateComponent,
    OrderViewComponent
  ],
  imports: [
    SharedModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NgSelectModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class OrderModule { }
