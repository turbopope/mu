import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '../../model/food';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as math from 'mathjs';
import { TextDecoder } from 'text-encoding';
import { set } from 'lodash';

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
    return new Food({
      name: null,
      energy: nutrients["Energy"] || math.unit(0, 'g'),
      water: nutrients["Water"] || math.unit(0, 'g'),
      protein: nutrients["Protein"] || math.unit(0, 'g'),
      lipids: {
        saturated: nutrients["Fatty acids, total saturated"] || math.unit(0, 'g'),
        mono: nutrients["Fatty acids, total monounsaturated"] || math.unit(0, 'g'),
        poly: nutrients["Fatty acids, total polyunsaturated"] || math.unit(0, 'g'),
      },
      carbs: {
        total: nutrients["Carbohydrate, by difference"] || math.unit(0, 'g'),
        fiber: nutrients["Fiber, total dietary"] || math.unit(0, 'g'),
        sugar: nutrients["Sugars, total"] || math.unit(0, 'g'),
      },
      vitamin_a: nutrients["Vitamin A, RAE"] || math.unit(0, 'g'),
      vitamin_b6: nutrients["Vitamin B-6"] || math.unit(0, 'g'),
      vitamin_c: nutrients["Vitamin C, total ascorbic acid"] || math.unit(0, 'g'),
      vitamin_d: nutrients["Vitamin D (D2 + D3)"] || math.unit(0, 'g'),
      calcium: nutrients["Calcium, Ca"] || math.unit(0, 'g'),
      iron: nutrients["Iron, Fe"] || math.unit(0, 'g'),
      magnesium: nutrients["Magnesium, Mg"] || math.unit(0, 'g')
    });

    function parseFoodLine(line): any {
      let [_, name, rest] = line.split(/"(.+?)",(.+)/)
      let [unit, value] = rest.split(',');
      unit = unit.replace('µg', 'ug');
      if (unit === 'IU') return {};
      let result = {};
      result[name] = math.divide(math.unit(value, unit), 100);

      return result;
    }
  }


}
