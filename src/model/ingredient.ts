import { Food } from "./food";
import * as math from 'mathjs';

export class Ingredient {
  amount: number;
  food: Food;

  constructor(amount: number, food: Food) {
    this.food = food;
    this.amount = amount;
  }

  public get energy():          math.Unit { return math.multiply(this.food.energy,           this.amount) as math.Unit; }
  public get water():           math.Unit { return math.multiply(this.food.water,            this.amount) as math.Unit; }
  public get protein():         math.Unit { return math.multiply(this.food.protein,          this.amount) as math.Unit; }
  
  public get saturatedLipids(): math.Unit { return math.multiply(this.food.lipids.saturated, this.amount) as math.Unit; }
  public get monoLipids():      math.Unit { return math.multiply(this.food.lipids.mono,      this.amount) as math.Unit; }
  public get polyLipids():      math.Unit { return math.multiply(this.food.lipids.poly,      this.amount) as math.Unit; }
  public get lipids():          math.Unit { return math.multiply(this.food.lipidsTotal,      this.amount) as math.Unit; }
  
  public get totalCarbs():      math.Unit { return math.multiply(this.food.carbs.total,      this.amount) as math.Unit; }
  public get fiber():           math.Unit { return math.multiply(this.food.carbs.fiber,      this.amount) as math.Unit; }
  public get sugar():           math.Unit { return math.multiply(this.food.carbs.sugar,      this.amount) as math.Unit; }
  
  public get vitamin_a():       math.Unit { return math.multiply(this.food.vitamin_a,        this.amount) as math.Unit; }
  public get vitamin_b6():      math.Unit { return math.multiply(this.food.vitamin_b6,       this.amount) as math.Unit; }
  public get vitamin_c():       math.Unit { return math.multiply(this.food.vitamin_c,        this.amount) as math.Unit; }
  public get vitamin_d():       math.Unit { return math.multiply(this.food.vitamin_d,        this.amount) as math.Unit; }
  
  public get calcium():         math.Unit { return math.multiply(this.food.calcium,          this.amount) as math.Unit; }
  public get iron():            math.Unit { return math.multiply(this.food.iron,             this.amount) as math.Unit; }
  public get magnesium():       math.Unit { return math.multiply(this.food.magnesium,        this.amount) as math.Unit; }
}