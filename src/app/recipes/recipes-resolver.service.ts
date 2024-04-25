import {inject} from "@angular/core";
import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {DataStorageService} from "../shared/data-storage.service";

import {RecipeService} from "./recipe.service";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer"
import {Actions, ofType} from "@ngrx/effects";
import {fetchRecipes} from "./store/recipe.actions";
import {map, take} from "rxjs/operators";
import * as RecipeActions from "./store/recipe.actions";
import {Observable} from "rxjs";


export const recipesResolver : ResolveFn<Observable<Recipe[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Recipe[]> => {
  const store = inject(Store<fromApp.AppState>);
  const actions$ = inject(Actions);

  store.dispatch(fetchRecipes());
    return actions$.pipe(
      ofType(RecipeActions.setMyRecipes),
      take(1),
      map(action => action.recipes.myRecipes)
    );
}


export const otherRecipesResolver : ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store = inject(Store<fromApp.AppState>);
  const actions$ = inject(Actions);

  store.dispatch(fetchRecipes());
  return actions$.pipe(
    ofType(RecipeActions.setMyRecipes),
    take(1),
    map(action => action.recipes.otherRecipes)
  );
}
