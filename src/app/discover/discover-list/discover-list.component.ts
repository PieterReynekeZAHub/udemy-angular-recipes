import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../../recipes/recipe.model";
import {RecipeService} from "../../recipes/recipe.service";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: 'app-discover-list',
  templateUrl: './discover-list.component.html',
  styleUrl: './discover-list.component.css'
})
export class DiscoverListComponent implements OnInit, OnDestroy {

  otherRecipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService, private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('recipes')
      .pipe(
        map((rcipeState) => {
          console.log('..here', rcipeState)
          return rcipeState.otherRecipes;
        })
      )
      .subscribe(
        (recipes: Recipe[]) => {
          console.log('here', recipes)
          this.otherRecipes = recipes;
        }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
