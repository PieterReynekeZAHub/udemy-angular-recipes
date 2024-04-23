import {createReducer, on} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";
import {
  addIngredient,
  addIngredients,
  deleteIngredient,
  startEdit,
  stopEdit,
  updateIngredient
} from "./shopping-list.actions";



export interface State{
  ingredients : Ingredient[],
  editedIngredient: Ingredient,
  editedIndex: number
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [
    new Ingredient('apple', 5),
    new Ingredient('cheese', 1)
  ],
  editedIngredient: null,
  editedIndex: -1
};
export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, action) => {
    return {...state, ingredients: [...state.ingredients, action.value]}
  }),
  on(addIngredients, (state, action) => {
    return {...state, ingredients: [...state.ingredients, ...action.value]}
  }),
  on(deleteIngredient, (state, action) => {
    return {
      ...state, ingredients: state.ingredients.filter((ig, igIndex) => {
        return igIndex !== state.editedIndex;
      }),
      editedIndex: -1,
      editedIngredient: null
    }
  }),
  on(updateIngredient, (state, action) => {
    const ingredient = state.ingredients[state.editedIndex];
    const updatedIngredient = {
      ...ingredient,
      ...action.ingredient
    }
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[state.editedIndex] = updatedIngredient;
    return {
      ...state,
      ingredients: updatedIngredients,
    editedIndex: -1,
    editedIngredient: null
    }
  }),
  on(startEdit, (state, action) =>{
    return{...state,
      editedIndex: action.index,
    editedIngredient: {...state.ingredients[action.index]}}
  }),
  on(stopEdit, (state, action) =>{
    return{
      ...state,
      editedIngredient: null,
      editedIndex: -1

    }
  })
)
