import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService{

  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  // private ingredients: Ingredient[] = [
  //   new Ingredient('Apples', 5),
  //   new Ingredient('Tomatoes', 10)
  // ];
  private ingredients: Ingredient[] = [];

    getIngredients(){
    console.log(this.ingredients);
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients)
    console.log(this.ingredients.slice());
  }

  addIngredients(ingredientsToAdd: Ingredient[]) {
    this.ingredients.push(...ingredientsToAdd)
    this.ingredientChanged.next(this.ingredients)
    console.log(this.ingredients);
  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice())
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice())
  }
}
