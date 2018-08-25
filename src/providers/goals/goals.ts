import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, from } from 'rxjs';

@Injectable()
export class GoalsProvider {

  constructor(private storage: Storage) {}

  public getGoal(): Observable<number> { return from(this.storage.get('goal')); }
  public setGoal(goal: number) { this.storage.set('goal', goal); }

}
