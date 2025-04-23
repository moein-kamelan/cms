import { Pipe, PipeTransform } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Pipe({
  name: 'convertBoolean'
})
export class ConvertBooleanPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): any {
    return value ? ''  : 'خیر';  
  }

}
