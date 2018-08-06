import { Unit } from "mathjs";

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
}
