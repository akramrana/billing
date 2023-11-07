import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SizeRoutingModule } from './size-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../../shared/shared.module';
import { SizeIndexComponent } from './size-index/size-index.component';
import { SizeCreateUpdateComponent } from './size-create-update/size-create-update.component';


@NgModule({
  declarations: [
    SizeIndexComponent,
    SizeCreateUpdateComponent
  ],
  imports: [
    SharedModule,
    SizeRoutingModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
  ]
})
export class SizeModule { }
