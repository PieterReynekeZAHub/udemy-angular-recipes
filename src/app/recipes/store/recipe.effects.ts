import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {of} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as fromRecipeActions from "./recipe.actions";
import {Recipe} from "../recipe.model";
import {setMyRecipes, startRecipeSorting} from "./recipe.actions";
import {HttpClient} from "@angular/common/http";


export class RecipeState{
  public myRecipes: Recipe[];
  public otherRecipes: Recipe[];

  constructor(myRecipes: Recipe[], otherRecipes: Recipe[]) {
  }
}
@Injectable()
export class RecipeEffects {


  startRecipeSorting = createEffect(() => this.actions$.pipe(
    ofType(fromRecipeActions.startRecipeSorting),
    switchMap((recipesToSort) => {
      console.log('recipes to sort', recipesToSort)
      return of(setMyRecipes({recipes: this.sortRecipes(recipesToSort.recipes)}))
    })
  ))

  fetchRecipes = createEffect(() => this.actions$.pipe(
    ofType(fromRecipeActions.fetchRecipes),
    switchMap(() => {
      return this.http.get<Recipe[]>('https://recipe-app-fd8f4-default-rtdb.europe-west1.firebasedatabase.app/recipes.json');
    }),
    map(recipes => {
      if (recipes === null) {
        return []; // Return an empty array if recipes is null
      } else {
        return recipes.map(recipe => {
          return {
            ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }
    }),
    map(recipes => {
      console.log("Return Recipes from API", recipes)
      return setMyRecipes({recipes: this.sortRecipes(recipes)})
    })
    ));




  constructor(private actions$: Actions, private store: Store<fromApp.AppState>, private http: HttpClient) {

  }

  private sortRecipes(recipesToSort: Recipe[]) {
    const myRecipes = [];
    const otherRecipes = [];

    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    for (let recipe of recipesToSort) {
      // console.log('userId ', recipe.userIds)
      // console.log('userData.id', userData.id)
      if (recipe.userIds.includes(userData.id)) {
        myRecipes.push(recipe)
      }else{
        otherRecipes.push(recipe)
      }

    }
    const recipeState = {myRecipes: myRecipes,
    otherRecipes: otherRecipes}
    console.log("RecipeState = ", recipeState)
    return recipeState;
  }
}


