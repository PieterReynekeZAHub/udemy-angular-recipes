import {Component, Input, OnInit} from '@angular/core';

import {ActivatedRoute, Params, Router} from "@angular/router";
import {Recipe} from "../../recipes/recipe.model";
import {RecipeService} from "../../recipes/recipe.service";
import {map, switchMap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {ADD_INGREDIENTS} from "../../shopping-list/store/shopping-list.actions";

@Component({
  selector: 'app-discover-detail',
  templateUrl: './discover-detail.component.html',
  styleUrl: './discover-detail.component.css'
})
export class DiscoverDetailComponent implements OnInit{

  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.route.params.pipe(map(params => {
      return +params['id'];
    }), switchMap(id => {
      this.id = id;
      return this.store.select('recipes')
    }), map(recipesState => {
      return recipesState.otherRecipes.find((recipe, index) => {
        return index === this.id;
      });
    }))
      .subscribe(
        (recipe) => {

          this.recipe = recipe;
        }
      )
  }

  onAddToShoppingList() {

    this.store.dispatch({type: ADD_INGREDIENTS, value: this.recipe.ingredients})

  }

 onAddToRecipes(){
    console.log("HERE!!!!!")
   console.log(this.recipe)
      this.recipeService.addRecipe(this.recipe)
  }


}
