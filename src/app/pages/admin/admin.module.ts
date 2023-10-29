import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { AdminCreateUpdateComponent } from './admin-create-update/admin-create-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesComponent } from '../control-messages/control-messages.component';


@NgModule({
  declarations: [
    AdminIndexComponent,
    AdminCreateUpdateComponent,
    ControlMessagesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
