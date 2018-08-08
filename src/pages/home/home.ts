import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FoodProvider } from '../../providers/food/food';
import { tap, startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import * as math from 'mathjs';
import { set, isObject } from 'lodash';
import { Ingredient } from '../../model/ingredient';
import Utils from '../../util/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public FOOD_KEYS = ['currants', 'oats', 'apples', 'chia_seeds', 'cashews', 'rice_milk'];
  public NUTRITION_KEYS = [
    'amount',
    'energy',
    'water',
    'protein',
    'lipids',
    'saturatedLipids',
    'monoLipids',
    'polyLipids',
    'totalCarbs',
    'fiber',
    'sugar',
    'otherCarbs',
    'calcium',
    'magnesium',
    'iron',
    'vitamin_a',
    'vitamin_b6',
    'vitamin_c',
    'vitamin_d',
  ];

  public foods = this.FOOD_KEYS.reduce((foods, foodKey) => set(foods, foodKey, this.foodProvider.getFood(foodKey)), {});
  public amountControllers = this.FOOD_KEYS.reduce((controllers, foodKey) => set(controllers, foodKey, new FormControl()), {});
  public amounts = this.FOOD_KEYS.reduce((amounts, foodKey) => set(amounts, foodKey, this.amountControllers[foodKey].valueChanges.pipe(startWith(0))), {});
  public ingredients = this.FOOD_KEYS.reduce((ingredients, foodName) => set(ingredients, foodName, combineLatest(this.foods[foodName], this.amounts[foodName]).pipe(map(([food, amount]) => new Ingredient(amount, food)))), {});

  public energy = combineLatest(Object.values(this.ingredients)).pipe(
    map(ingredients => ingredients.map(ingredient => ingredient['energy'])),
    map(ingredients => Utils.sumUnits(ingredients))
  );

  public nutrients = this.NUTRITION_KEYS.reduce((nutrients, nutrientKey) => set(nutrients, nutrientKey, this.nutrientObservable(nutrientKey)), {});
  private nutrientObservable(nutrientKey: string): Observable<math.Unit> {
    return combineLatest(Object.values(this.ingredients)).pipe(
      map(ingredients => ingredients.map(ingredient => ingredient[nutrientKey])),
      map(ingredients => Utils.sumUnits(ingredients))
    );
  }

  constructor(public navCtrl: NavController, private foodProvider: FoodProvider) {}

}
