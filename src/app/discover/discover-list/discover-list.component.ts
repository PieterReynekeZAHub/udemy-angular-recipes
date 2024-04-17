import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../../recipes/recipe.model";
import {RecipeService} from "../../recipes/recipe.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-discover-list',
  templateUrl: './discover-list.component.html',
  styleUrl: './discover-list.component.css'
})
export class DiscoverListComponent implements OnInit, OnDestroy {

  otherRecipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.subscription = this.recipeService.otherRecipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.otherRecipes = recipes;
        }
      )
    this.otherRecipes = this.recipeService.getOtherRecipes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
