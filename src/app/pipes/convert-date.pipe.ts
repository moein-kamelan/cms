import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDate'
})
export class ConvertDatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]) {
    const currentDate = new Date(value)
    return currentDate.toLocaleDateString("fa");
  }

}
