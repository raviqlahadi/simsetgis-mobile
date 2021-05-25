import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeLine'
})
export class RemoveLinePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace('_',' ');
  }

}
