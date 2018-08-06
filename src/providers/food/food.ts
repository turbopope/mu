import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '../../app/model/food';
import { Observable } from '../../../node_modules/rxjs';
import { map, tap } from '../../../node_modules/rxjs/operators';
import * as math from 'mathjs';
import { TextDecoder } from 'text-encoding';
import { set } from 'lodash';

/*
  Generated class for the FoodProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FoodProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FoodProvider Provider');
    math.createUnit('kcal', '4184 J')
  }
  
  public getFood(foodName: string): Observable<Food> {
    return this.http.get(`/assets/foods/${foodName}.csv`, {responseType: 'arraybuffer'}).pipe(
      map(text => new TextDecoder('windows-1252').decode(text)),
      map(this.parseFoodCsv),
      map(food => set(food, 'name', foodName))
    );
  }

  private parseFoodCsv(csv: string): Food {
    let nutrients = csv.split('\n')
                    .slice(4)
                    .filter(line => line.startsWith('"'))
                    .map(parseFoodLine)
                    .reduce((nutrient, nutrients) => Object.assign(nutrients, nutrient), {});
    console.dir(nutrients)
    return {
      name: null,
      energy: nutrients["Energy"],
      water: nutrients["Water"],
      protein: nutrients["Protein"],
      lipids: {
        saturated: nutrients["Fatty acids, total saturated"],
        mono: nutrients["Fatty acids, total monounsaturated"],
        poly: nutrients["Fatty acids, total polyunsaturated"],
      },
      carbs: {
        total: nutrients["Carbohydrate, by differenc"],
        fiber: nutrients["Fiber, total dietary"],
        sugar: nutrients["Sugars, total"],
      },
      vitamin_a: nutrients["Vitamin A, RAE"],
      vitamin_b6: nutrients["Vitamin B-6"],
      vitamin_c: nutrients["Vitamin C, total ascorbic acid"],
      vitamin_d: nutrients["Vitamin D (D2 + D3)"],
      calcium: nutrients["Calcium, Ca"],
      iron: nutrients["Iron, Fe"],
      magnesium: nutrients["Magnesium, Mg"]
    };

    function parseFoodLine(line): any {
      let [_, name, rest] = line.split(/"(.+)",(.+)/)
      let [unit, value] = rest.split(',');
      unit = unit.replace('µg', 'ug');
      if (unit === 'IU') return {};
      let result = {};
      result[name] = math.divide(math.unit(value, unit), 100);

      return result;
    }
  }


}
