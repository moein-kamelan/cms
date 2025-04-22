import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nationalCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const nationalCode = control.value;

    if (!nationalCode) {
      return null;
    }

    if (!/^\d{10}$/.test(nationalCode)) {
      return {
        invalidNationalCode: {
          value: nationalCode,
          message: 'کد ملی باید فقط شامل ۱۰ رقم باشد!',
        },
      };
    }

    if (/^(\d)\1{9}$/.test(nationalCode)) {
      return {
        invalidNationalCode: {
          value: nationalCode,
          message: 'کد ملی نمی‌تواند از ارقام تکراری تشکیل شده باشد!',
        },
      };
    }

    const check = +nationalCode[9];
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += +nationalCode[i] * (10 - i);
    }

    const remainder = sum % 11;

    if (
      (remainder < 2 && check === remainder) ||
      (remainder >= 2 && check === 11 - remainder)
    ) {
      return null; // معتبر
    } else {
      return {
        invalidNationalCode: {
          value: nationalCode,
          message: 'کد ملی وارد شده نامعتبر است!',
        },
      };
    }
  };
}
