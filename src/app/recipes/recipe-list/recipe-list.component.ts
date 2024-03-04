import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit{

  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1569/20210503-MLMC-Spring-Radish-Pea-Lobster-Salad-Labneh2883-scaled-1024x576-c.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1569/20210503-MLMC-Spring-Radish-Pea-Lobster-Salad-Labneh2883-scaled-1024x576-c.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
