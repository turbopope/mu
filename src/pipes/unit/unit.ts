import { Pipe, PipeTransform } from '@angular/core';
import { Unit, format, FormatOptions } from 'mathjs';

@Pipe({
  name: 'unit',
})
export class UnitPipe implements PipeTransform {
  transform(unit: Unit, options: number|FormatOptions = 2) {
    return format(unit, options);
  }
}
