import {AbstractControl} from '@angular/forms';

export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any, fieldName?: any) {
    const config:any = {
      'required': fieldName + ' is required.',
      'min': 'Invalid value!',
      'max': 'Invalid value!',
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidEmailAddress': 'Invalid email address',
      'invalidConfirmPassword': 'Invalid confirm password',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      'minlength': `Minimum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }

  static emailValidator(control:any) {
    // RFC 2822 compliant regex
    if (!control.value || control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return {'invalidEmailAddress': true};
    }
  }

  public static matchPassword(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ invalidConfirmPassword: true });
    } else {
      return null;
    }
    return null;
  }

  static passwordValidator(control:any) {
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return {'invalidPassword': true};
    }
  }

  public static positive(control: AbstractControl) {
    if (Number(control.value) < 0) {
      return {isNegative: true};
    } else {
      return null;
    }
  }

  public static wholeNumberValidator(control: AbstractControl){
    const number  = Number(control.value);
    if (Math.floor(number) == number) {
      return {notWholeNumber: true};
    } else {
      return null;
    }
  }

}
