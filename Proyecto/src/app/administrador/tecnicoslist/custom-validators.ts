import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailDomainValidator(allowedDomains: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // No error if value is empty, let required validator handle that
    }

    const email = control.value;
    const domain = email.substring(email.lastIndexOf('@') + 1);
    if (!allowedDomains.includes(domain)) {
      return { invalidEmailDomain: true };
    }

    return null;
  };
}
