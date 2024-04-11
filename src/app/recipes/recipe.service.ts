import {Recipe} from "./recipe.model";
import { Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('Pie-Se-Pizza',
  //     `Pizza Napoletana, also known as Neapolitan pizza.`,
  //     'https://www.publicdomainpictures.net/pictures/470000/nahled/pizza-italian-style.jpg',
  //     [
  //       {name: 'Cheese', amount: 20},
  //       {name: 'tomatoes', amount: 3},
  //       {name: 'salami', amount: 9}]),
  //   new Recipe('BC Burgers',
  //     'A mouthwatering burger with crispy bacon and melted cheese',
  //     'https://live.staticflickr.com/4059/4449825083_19f16cfd07_b.jpg',
  //     [{name: 'burger-buns', amount: 6},
  //       {name: 'patties', amount: 6},
  //       {name: 'tomatoes', amount: 3},
  //       {name: 'bacon', amount: 2},
  //     ])
  // ];
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {

    this.slService.addIngredients(ingredients);
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())

  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice())
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice())
  }

}
