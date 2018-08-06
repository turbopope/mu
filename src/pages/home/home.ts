import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FoodProvider } from '../../providers/food/food';
import { tap, startWith, map } from '../../../node_modules/rxjs/operators';
import { FormControl } from '@angular/forms';
import { combineLatest } from '../../../node_modules/rxjs';
import * as math from 'mathjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private foodProvider: FoodProvider) {

  }

  public food = this.foodProvider.getFood('currants');
  
  // public gramControl: FormControl = new FormControl();

  // private grams = this.gramControl.valueChanges.pipe(
  //   startWith(100),
  //   tap(console.dir)
  // );

  // public energy = combineLatest(this.grams, this.food).pipe(
  //   map(([grams, food]) => math.multiply(food.energy, grams))
  // );

}
