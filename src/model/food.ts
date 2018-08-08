import { Unit, multiply } from "mathjs";
import Utils from "../util/util";

export class Food {
  name: string;
  energy: Unit;
  water: Unit;
  protein: Unit;
  lipids: {
    saturated: Unit;
    mono: Unit;
    poly: Unit;
  }
  carbs: {
    total: Unit;
    fiber: Unit;
    sugar: Unit;
  }
  vitamin_a: Unit;
  vitamin_b6: Unit;
  vitamin_c: Unit;
  vitamin_d: Unit;
  calcium: Unit;
  iron: Unit;
  magnesium: Unit;

  constructor(fields: any) {
    Object.assign(this, fields);
  }
  
  public get lipidsTotal(): Unit { return Utils.sumUnits([this.lipids.saturated, this.lipids.mono, this.lipids.poly]) }
  public get carbsTotal(): Unit { return this.carbs.total }
  public get otherCarbs(): Unit { return Utils.sumUnits([this.carbs.total, multiply(this.carbs.fiber, -1) as Unit, multiply(this.carbs.sugar, -1) as Unit]) }
}
