import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer"
import {startEdit} from "./store/shopping-list.actions";


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Observable<{ingredients: Ingredient[]}>;
  // private subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>
) {}

  ngOnInit(){
    // this.ingredients = this.shoppingListService.getIngredients();
    this.ingredients = this.store.select('shoppingList');
    // this.subscription = this.shoppingListService.ingredientChanged
    //   .subscribe(
    //   (ingredients: Ingredient[])=>{
    //     this.ingredients = ingredients
    //   }

}

ngOnDestroy() {
    // this.subscription.unsubscribe();
}

  onEditItem(index: number) {
    this.store.dispatch(startEdit({index: index}));

  }
}
