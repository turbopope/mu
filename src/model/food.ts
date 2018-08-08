import { Unit } from "mathjs";
import { sumUnits } from "../util/sumUnits";

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
  
  public get lipidsTotal() { return sumUnits([this.lipids.saturated, this.lipids.mono, this.lipids.poly]) }
  public get carbsTotal() { return this.carbs.total }
}
