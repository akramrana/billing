import { NgModule } from '@angular/core';

import { BusinessesRoutingModule } from './businesses-routing.module';
import { BusinessIndexComponent } from './business-index/business-index.component';
import { BusinessCreateUpdateComponent } from './business-create-update/business-create-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    BusinessIndexComponent,
    BusinessCreateUpdateComponent,
  ],
  imports: [
    SharedModule,
    BusinessesRoutingModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
  ]
})
export class BusinessesModule { }
