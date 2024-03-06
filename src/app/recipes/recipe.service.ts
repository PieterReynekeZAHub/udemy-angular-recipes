import {Recipe} from "./recipe.model";
import {EventEmitter} from "@angular/core";

export class RecipeService{

  recipeSelected = new EventEmitter<Recipe>()

 private  recipes: Recipe[] = [
    new Recipe('A Test Recipe1', 'This is simply a test', 'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1569/20210503-MLMC-Spring-Radish-Pea-Lobster-Salad-Labneh2883-scaled-1024x576-c.jpg'),
    new Recipe('A Test Recipe2', 'This is simply a test', 'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1569/20210503-MLMC-Spring-Radish-Pea-Lobster-Salad-Labneh2883-scaled-1024x576-c.jpg')
  ];

 getRecipes(){
   return this.recipes.slice();
 }

}
