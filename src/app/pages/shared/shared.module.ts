import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessagesComponent } from '../control-messages/control-messages.component';



@NgModule({
  declarations: [
    ControlMessagesComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    ControlMessagesComponent,
  ]
})
export class SharedModule { }
