import * as math from 'mathjs';

export function sumUnits(units: math.Unit[]): math.Unit {
  if (units.length === 0) {
    return math.unit(0, 'g');
  } else if (units.length === 1) {
    return units[0];
  } else if (units.length === 2) {
    return math.add(units[0], units[1]) as math.Unit;
  } else {
    return math.add(units[0], this.sumUnits(units.slice(1))) as math.Unit;
  }
}