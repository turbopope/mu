import { Food } from "./food";
import { Observable } from "../../../node_modules/rxjs";

export class Ingredient extends Food {
  amount: number | Observable<number>;
}