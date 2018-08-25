import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime } from 'rxjs/operators';
import { from } from 'rxjs';
import { GoalsProvider } from '../../providers/goals/goals';

/**
 * Generated class for the GoalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goals',
  templateUrl: 'goals.html',
})
export class GoalsPage {

  public control = new FormControl();
  public amount = this.control.valueChanges;

  constructor(public navCtrl: NavController, public navParams: NavParams, private goalsProvider: GoalsProvider) {
    this.goalsProvider.getGoal().subscribe(goal => this.control.setValue(goal || 11));
    this.control.valueChanges.pipe(debounceTime(100)).subscribe(goal => goalsProvider.setGoal(goal))
  }

}
