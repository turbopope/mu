import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FoodProvider } from '../../providers/food/food';
import { tap, startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import * as math from 'mathjs';
import { set, isObject } from 'lodash';
import { Ingredient } from '../../app/model/ingredient';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public FOOD_KEYS = ['currants', /*'oats',*/ 'apples', 'chia_seeds', 'cashews', 'rice_milk'];
  public foods = this.FOOD_KEYS.reduce((foods, foodKey) => set(foods, foodKey, this.foodProvider.getFood(foodKey)), {});
  public amountControllers = this.FOOD_KEYS.reduce((controllers, foodKey) => set(controllers, foodKey, new FormControl()), {});
  public amounts = this.FOOD_KEYS.reduce((amounts, foodKey) => set(amounts, foodKey, this.amountControllers[foodKey].valueChanges.pipe(startWith(0))), {});
  public ingredients = this.FOOD_KEYS.reduce((ingredients, foodName) => set(ingredients, foodName, combineLatest(this.foods[foodName], this.amounts[foodName]).pipe(map(([food, amount]) => new Ingredient(amount, food)))), {});

  public energy = combineLatest(Object.values(this.ingredients)).pipe(
    map(ingredients => ingredients.map(ingredient => ingredient['energy'])),
    map(ingredients => this.sumUnits(ingredients))
  );

  constructor(public navCtrl: NavController, private foodProvider: FoodProvider) {}

  private sumUnits(units: math.Unit[]): math.Unit {
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
}
