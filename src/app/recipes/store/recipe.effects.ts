import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {of} from "rxjs";
import {switchMap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as fromRecipeActions from "./recipe.actions";
import {Recipe} from "../recipe.model";
import {setMyRecipes} from "./recipe.actions";

@Injectable()
export class RecipeEffects {


  startRecipeSorting = createEffect(() => this.actions$.pipe(
    ofType(fromRecipeActions.startRecipeSorting),
    switchMap((recipesToSort) => {
      console.log('recipes to sort', recipesToSort)
      return of(setMyRecipes({recipes: this.sortRecipes(recipesToSort.recipes)}))
    })
  ))

  constructor(private actions$: Actions, private store: Store<fromApp.AppState>) {

  }

  private sortRecipes(recipesToSort: Recipe[]) {
    const myRecipes = [];
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    for (let recipe of recipesToSort) {
      console.log('userId ', recipe.userIds)
      console.log('userData.id', userData.id)
      if (recipe.userIds.includes(userData.id)) {
        myRecipes.push(recipe)
      }
      console.log('myRecipes', myRecipes)

    }
    return myRecipes;
  }
}


