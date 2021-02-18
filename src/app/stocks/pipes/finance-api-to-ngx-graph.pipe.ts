import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'financeApiToNgxGraph'
})
export class FinanceApiToNgxGraphPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    console.warn('Pipe received an undefined value.');
    return '';
  }

}
