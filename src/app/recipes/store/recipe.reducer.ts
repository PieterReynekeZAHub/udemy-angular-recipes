import {Recipe} from "../recipe.model";
import {createReducer, on} from "@ngrx/store";
import {addRecipe, setMyRecipes, startRecipeSorting, updateRecipe} from "./recipe.actions";

export interface State {
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
      recipes: [...action.recipes.recipes],
      myRecipes: [...action.recipes.myRecipes],
      otherRecipes: [...action.recipes.otherRecipes],
    }
  }),
  on(startRecipeSorting, (state, action) => {
    return {
      ...state,
      recipes: [...state.recipes]
    }
  }),
  on(addRecipe, (state, action) => {
    return {
      ...state,
      recipes: [...state.recipes, action.recipe]
    }
  }),
  on(updateRecipe, (state, action) => {
      const updatedRecipe = {
        ...state.recipes[action.index],
        ...action.newRecipe
      }
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes
      }
    }
  )
)



