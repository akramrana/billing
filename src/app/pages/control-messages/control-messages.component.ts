import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'ngx-control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.scss']
})
export class ControlMessagesComponent implements OnInit {

  @Input() control: any;
  @Input() fieldName: string | any;
  constructor() { }

  ngOnInit(): void { }

  get errorMessage() {
    // console.log('this.control', this.control);
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(
          propertyName,
          this.control.errors[propertyName],
          this.fieldName
        );
      }
    }

    return null;
  }

}
