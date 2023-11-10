import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryRoutingModule } from './delivery-routing.module';
import { DeliveryIndexComponent } from './delivery-index/delivery-index.component';
import { DeliveryCreateUpdateComponent } from './delivery-create-update/delivery-create-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../shared/shared.module';
import { DeliveryViewComponent } from './delivery-view/delivery-view.component';


@NgModule({
  declarations: [
    DeliveryIndexComponent,
    DeliveryCreateUpdateComponent,
    DeliveryViewComponent
  ],
  imports: [
    SharedModule,
    DeliveryRoutingModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NgSelectModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class DeliveryModule { }
