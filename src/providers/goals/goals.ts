import { Injectable, AfterViewInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, from, merge, of, Subject } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { NUTRIENTS, NUTRIENT_GOALS } from '../../util/nutrients';
import { set, isObject } from 'lodash';
import { math, Unit } from '../../util/math';

@Injectable()
export class GoalsProvider {

  constructor(private storage: Storage) {}

  public  getCaloriesFromStorage = () => from(this.storage.get('calories')).pipe(take(1));
  private setCaloriesSubject = new Subject();

  public caloriesGoal = merge(this.getCaloriesFromStorage(), this.setCaloriesSubject);

  public setCalories(calories: number) {
    this.storage.set('calories', calories);
    this.setCaloriesSubject.next(calories);
  }

  public getNutrient(key: string, calories: number): Unit {
    return math.multiply(NUTRIENT_GOALS[key] as Unit, calories) as Unit;
  }

  public nutrientGoals = NUTRIENTS.reduce((nutrientGoals, nutrient) => set(nutrientGoals, nutrient, this.caloriesGoal.pipe(map(calories => this.getNutrient(nutrient, calories)))), {});

}
