import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipesService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put('https://recipe-app-fd8f4-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
      .subscribe({
        next: (response) => console.log(response)
      });

  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://recipe-app-fd8f4-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
    ).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap((recipes) => {
        this.recipesService.setRecipes(recipes)
      })
    );
  }

}
