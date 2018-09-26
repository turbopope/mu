import { Injectable, AfterViewInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, from, merge, of, Subject } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import NUTRIENTS from '../../util/nutrients';
import { set, isObject } from 'lodash';
import { math, Unit } from '../../util/math';

@Injectable()
export class GoalsProvider {

  public NUTRIENT_GOALS = {
    'water':           math.unit(2 / 2000,       'L'),
    'protein':         math.unit(50 / 2000,      'g'),
    'lipids':          math.unit(65 / 2000,      'g'),
    'saturatedLipids': math.unit(20 / 2000,      'g'),
    'monoLipids':      math.unit(25 / 2000,      'g'),
    'polyLipids':      math.unit(20 / 2000,      'g'),
    'totalCarbs':      math.unit(300 / 2000,     'g'),
    'fiber':           math.unit(25 / 2000,      'g'),
    'sugar':           math.unit(25 / 2000,      'g'),
    'otherCarbs':      math.unit(250 / 2000,     'g'),
    'calcium':         math.unit(1000 / 2000,    'mg'),
    'magnesium':       math.unit(400 / 2000,     'mg'),
    'iron':            math.unit(8 / 2000,       'mg'),
    'vitamin_a':       math.unit(800 / 2000,     'mg'),
    'vitamin_b6':      math.unit(2 / 2000,       'mg'),
    'vitamin_c':       math.unit(90 / 2000,      'mg'),
    'vitamin_d':       math.unit(600 /40 / 2000, 'ug'),
  }

  constructor(private storage: Storage) {}

  public  getCaloriesFromStorage = () => from(this.storage.get('calories')).pipe(take(1));
  private setCaloriesSubject = new Subject();

  public caloriesGoal = merge(this.getCaloriesFromStorage(), this.setCaloriesSubject);

  public setCalories(calories: number) {
    this.storage.set('calories', calories);
    this.setCaloriesSubject.next(calories);
  }

  public getNutrient(key: string, calories: number): Unit {
    return math.multiply(this.NUTRIENT_GOALS[key] as Unit, calories) as Unit;
  }

  public nutrientGoals = NUTRIENTS.reduce((nutrientGoals, nutrient) => set(nutrientGoals, nutrient, this.caloriesGoal.pipe(map(calories => this.getNutrient(nutrient, calories)))), {});

}
