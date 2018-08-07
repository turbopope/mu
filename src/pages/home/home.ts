import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FoodProvider } from '../../providers/food/food';
import { tap, startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import * as math from 'mathjs';
import { set } from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public FOOD_KEYS = ['currants', /*'oats',*/ 'apples', 'chia_seeds', 'cashews', 'rice_milk'];

  constructor(public navCtrl: NavController, private foodProvider: FoodProvider) {
  }

  // public foods = combineLatest(this.FOOD_KEYS.map(this.foodProvider.getFood));
  public foods = this.FOOD_KEYS.reduce((foods, foodKey) => set(foods, foodKey, this.foodProvider.getFood(foodKey)), {});
  public amountControllers = this.FOOD_KEYS.reduce((controllers, foodKey) => set(controllers, foodKey, new FormControl()), {});
  public amounts = this.FOOD_KEYS.reduce((amounts, foodKey) => set(amounts, foodKey, this.amountControllers[foodKey].valueChanges.pipe(startWith(0))), {});

  public food = this.foodProvider.getFood('currants');
  
  public gramControl: FormControl = new FormControl();

  public grams = this.gramControl.valueChanges.pipe(
    startWith(0),
  );
  
  public energy = combineLatest(this.grams, this.food).pipe(
    tap(console.dir),
    map(([grams, food]) => math.multiply(food.energy, grams)),
  );

}
