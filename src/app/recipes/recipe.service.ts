import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {Store} from "@ngrx/store";
import {ADD_INGREDIENTS} from "../shopping-list/store/shopping-list.actions";
import * as fromRecipeActions from "./store/recipe.actions";
import {deleteRecipeUser} from "./store/recipe.actions";
import {v4 as uuidv4} from 'uuid';
import {map, take} from "rxjs/operators";
import * as fromApp from "../store/app.reducer";

@Injectable()
export class RecipeService {

  constructor(private store: Store<fromApp.AppState>) {
  }



  addRecipe(recipe: Recipe) {
    console.log("HERE!!")
    console.log("Before Updates: ", recipe)
    const userId = JSON.parse(localStorage.getItem('userData')).id;
    console.log("added UserID" + userId)
    let newRecipe = {...recipe}; // Create a new object
    if (newRecipe.userIds === undefined) {
      newRecipe.userIds = [];
    }
    newRecipe.userIds = [...newRecipe.userIds, userId]
    newRecipe.ownerId = newRecipe.ownerId ? newRecipe.ownerId : userId;
    newRecipe.recipeId = newRecipe.recipeId ? newRecipe.recipeId : uuidv4();
    console.log("After Updates: ", newRecipe.userIds.length)
    if (newRecipe.userIds.length > 1) {
      console.log("Update Recipe!!!")
      this.store.dispatch(fromRecipeActions.updateRecipe({index: newRecipe.recipeId, newRecipe: newRecipe}));
    } else {
      console.log("ADD Recipe!!!")
      this.store.dispatch(fromRecipeActions.addRecipe({recipe: newRecipe}));
    }


  }

  deleteRecipe(recipyId: string) {
    const userId = JSON.parse(localStorage.getItem('userData')).id;
    this.store.select('recipes').pipe(
      take(1),
      map(recipeState => {
        return recipeState.myRecipes.find((recipe, index) => {
          return recipe.recipeId === recipyId;
        });
      })).subscribe(recipe => {
        console.log("Delete Recipe: ", recipe)
        if (recipe.userIds.length === 1) {
          this.store.dispatch(fromRecipeActions.deleteRecipe({index: recipyId}));
        } else {
          console.log("Remove Owner from Recipy")
          this.store.dispatch(deleteRecipeUser({index: recipyId, recipe: recipe, userId: userId}));
        }
      }
    );
  }
}
