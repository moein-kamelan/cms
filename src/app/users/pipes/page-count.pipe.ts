import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pageCount'
})
export class PageCountPipe implements PipeTransform {

  transform(value: unknown, pageCount: number): unknown {
    return new Array(pageCount)
  }

}
