import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer"
import {startEdit} from "./store/shopping-list.actions";
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
  animations: [
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }), animate(300)
      ]),
      transition('* => void', [
        animate(300),
        style({
          opacity: 0,
          transform: 'translateX(100%)'
        }),
      ])
    ]),
  ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  // private subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
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
