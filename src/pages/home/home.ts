import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FoodProvider } from '../../providers/food/food';
import { tap, startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import * as math from 'mathjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private foodProvider: FoodProvider) {

  }

  public foods = combineLatest(
    this.foodProvider.getFood('currants'),
    // this.foodProvider.getFood('oats'),
    this.foodProvider.getFood('apples'),
    this.foodProvider.getFood('chia_seeds'),
    this.foodProvider.getFood('cashews'),
    this.foodProvider.getFood('rice_milk'),
  );

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
