import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer"
import * as RecipeActions from "../recipes/store/recipe.actions"

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipesService: RecipeService,
              private store: Store<fromApp.AppState>) {
  }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    console.log('recipes to store', recipes)
    this.http.put('https://recipe-app-fd8f4-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
      .subscribe({
        next: (response) => console.log(response)
      });

  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://recipe-app-fd8f4-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
    ).pipe(
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
      tap((recipes) => {
        console.log("Reciepes from store", recipes)
        this.store.dispatch(RecipeActions.startRecipeSorting({recipes: recipes}))
      })
    );

  }
}
