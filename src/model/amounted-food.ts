import { Food } from "./food";
import { math, Unit } from '../util/math';

export class AmountedFood {
  amount: number;
  food: Food;

  constructor(amount: number, food: Food) {
    this.food = food;
    this.amount = amount;
  }

  public get energy():          Unit { return math.multiply(this.food.energy,           this.amount) as Unit; }
  public get water():           Unit { return math.multiply(this.food.water,            this.amount) as Unit; }
  public get protein():         Unit { return math.multiply(this.food.protein,          this.amount) as Unit; }
  
  public get saturatedLipids(): Unit { return math.multiply(this.food.lipids.saturated, this.amount) as Unit; }
  public get monoLipids():      Unit { return math.multiply(this.food.lipids.mono,      this.amount) as Unit; }
  public get polyLipids():      Unit { return math.multiply(this.food.lipids.poly,      this.amount) as Unit; }
  public get lipids():          Unit { return math.multiply(this.food.lipidsTotal,      this.amount) as Unit; }
  
  public get totalCarbs():      Unit { return math.multiply(this.food.carbs.total,      this.amount) as Unit; }
  public get fiber():           Unit { return math.multiply(this.food.carbs.fiber,      this.amount) as Unit; }
  public get sugar():           Unit { return math.multiply(this.food.carbs.sugar,      this.amount) as Unit; }
  public get otherCarbs():      Unit { return math.multiply(this.food.otherCarbs,       this.amount) as Unit; }
  
  public get vitamin_a():       Unit { return math.multiply(this.food.vitamin_a,        this.amount) as Unit; }
  public get vitamin_b6():      Unit { return math.multiply(this.food.vitamin_b6,       this.amount) as Unit; }
  public get vitamin_c():       Unit { return math.multiply(this.food.vitamin_c,        this.amount) as Unit; }
  public get vitamin_d():       Unit { return math.multiply(this.food.vitamin_d,        this.amount) as Unit; }
  
  public get calcium():         Unit { return math.multiply(this.food.calcium,          this.amount) as Unit; }
  public get iron():            Unit { return math.multiply(this.food.iron,             this.amount) as Unit; }
  public get magnesium():       Unit { return math.multiply(this.food.magnesium,        this.amount) as Unit; }
}