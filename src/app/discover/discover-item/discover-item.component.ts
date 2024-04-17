import {Component, Input} from '@angular/core';
import {Recipe} from "../../recipes/recipe.model";


@Component({
  selector: 'app-discover-item',
  templateUrl: './discover-item.component.html',
  styleUrl: './discover-item.component.css'
})
export class DiscoverItemComponent {

  @Input() recipe: Recipe;
  @Input() index: number;


}
