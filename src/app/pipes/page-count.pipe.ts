import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pageCount'
})
export class PageCountPipe implements PipeTransform {

  transform(value: unknown, pageCount: number): number[] {
    return Array.from({ length: pageCount }, (_, i) => i + 1)
  }

}
