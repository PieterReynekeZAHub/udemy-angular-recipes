import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {addIngredient, deleteIngredient, stopEdit, updateIngredient} from "../store/shopping-list.actions";
import * as fromShoppingList from "../store/shopping-list.reducer";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  // editingItemIndex: number;
  editedItem: Ingredient;


  constructor(private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit() {
    this.store.select("shoppingList").subscribe(stateData => {
      if (stateData.editedIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        // this.editingItemIndex = stateData.editedIndex;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      } else {
        this.editMode = false;
      }
    });

  }

  onSubmit(form: NgForm) {
    const formValue = form.value;
    const newIngredient = new Ingredient(formValue.name, formValue.amount);
    if (this.editMode) {
      this.store.dispatch(updateIngredient({

        ingredient: newIngredient
      }));
    } else {
      this.store.dispatch(addIngredient({value: newIngredient}));
    }
    this.editMode = false;
    form.reset();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(stopEdit())
  }

  onClear() {
    this.slForm.reset()
    this.editMode = false;
    this.store.dispatch(stopEdit())
  }

  onDelete() {
    this.store.dispatch(deleteIngredient());
    this.onClear()
  }
}
