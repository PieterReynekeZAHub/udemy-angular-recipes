import {Recipe} from "../recipe.model";
import {createReducer, on} from "@ngrx/store";
import {setMyRecipes, startRecipeSorting} from "./recipe.actions";

export interface State{
  recipes: Recipe[];
  myRecipes: Recipe[];
  otherRecipes: Recipe[];
}

const initialState: State = {
  recipes: [],
  myRecipes: [],
  otherRecipes: []
}

export const recipeReducer = createReducer(
  initialState,

on(setMyRecipes, (state, action) => {
    return {
      ...state,
      myRecipes: [...action.recipes.myRecipes],
      otherRecipes: [...action.recipes.otherRecipes],
    }
  }),
  on(startRecipeSorting, (state, action) => {
    return {
      ...state,
      recipes: [...state.recipes]
    }
  })
)
