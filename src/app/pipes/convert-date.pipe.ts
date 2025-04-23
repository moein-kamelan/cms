import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDate'
})
export class ConvertDatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]) {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour12: false
    });
  }

}
