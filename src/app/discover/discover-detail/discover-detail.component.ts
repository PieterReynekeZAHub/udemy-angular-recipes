import {Component, Input, OnInit} from '@angular/core';

import {ActivatedRoute, Params, Router} from "@angular/router";
import {Recipe} from "../../recipes/recipe.model";
import {RecipeService} from "../../recipes/recipe.service";

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
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.recipe = this.recipeService.getOtherRecipe(this.id);
      }

    )
  }

  onAddToShoppingList() {

    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)

  }

 onAddToRecipes(){
    console.log("HERE!!!!!")
   console.log(this.recipe)
      this.recipeService.addRecipe(this.recipe)
  }


}
