import { Component, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime } from 'rxjs/operators';
import { from } from 'rxjs';
import { GoalsProvider } from '../../providers/goals/goals';
import NUTRIENTS from '../../util/nutrients';

@IonicPage()
@Component({
  selector: 'page-goals',
  templateUrl: 'goals.html',
})
export class GoalsPage implements AfterViewInit {

  public nuts = NUTRIENTS;

  public caloriesController = new FormControl();
  public calories = this.caloriesController.valueChanges;

  public getNutrient(key, calories) {
    return this.goalsProvider.getNutrient(key, calories);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private goalsProvider: GoalsProvider) {
    this.calories.pipe(debounceTime(10)).subscribe(goal => goalsProvider.setCalories(goal));
  }
  
  ngAfterViewInit() {
    this.goalsProvider.getCaloriesFromStorage().subscribe(goal => this.caloriesController.setValue(goal || 2000));
  }

}
