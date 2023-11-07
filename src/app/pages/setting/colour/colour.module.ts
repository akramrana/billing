import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColourRoutingModule } from './colour-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../../shared/shared.module';
import { ColourIndexComponent } from './colour-index/colour-index.component';
import { ColourCreateUpdateComponent } from './colour-create-update/colour-create-update.component';


@NgModule({
  declarations: [
    ColourIndexComponent,
    ColourCreateUpdateComponent
  ],
  imports: [
    SharedModule,
    ColourRoutingModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
  ]
})
export class ColourModule { }
