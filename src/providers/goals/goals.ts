import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, from, merge, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class GoalsProvider {

  public NUTRIENT_FACTORS = {
    'water':           0,
    'protein':         50 / 2000,
    'lipids':          65 / 2000,
    'saturatedLipids': 20 / 2000,
    'monoLipids':      0,
    'polyLipids':      0,
    'totalCarbs':      300 / 2000,
    'fiber':           25 / 2000,
    'sugar':           0,
    'otherCarbs':      0,
    'calcium':         60 / 2000,
    'magnesium':       400 / 2000,
    'iron':            18 / 2000,
    'vitamin_a':       5000 / 2000,
    'vitamin_b6':      2 / 2000,
    'vitamin_c':       60 / 2000,
    'vitamin_d':       400 / 2000
  }

  constructor(private storage: Storage) {}

  public getCalories() { return from(this.storage.get('calories')); }
  public setCalories(calories: number) { 
    this.storage.set('calories', calories);
  }

  public getNutrient(key, calories) { return calories * this.NUTRIENT_FACTORS[key]; }

}
