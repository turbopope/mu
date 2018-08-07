import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FoodProvider } from '../../providers/food/food';
import { tap, startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import * as math from 'mathjs';
import { set, isObject } from 'lodash';
import { Ingredient } from '../../app/model/ingredient';
import { Food } from '../../app/model/food';

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

  constructor(public navCtrl: NavController, private foodProvider: FoodProvider) {}
}
