import {Recipe} from "../recipe.model";
import {createReducer, on} from "@ngrx/store";
import {
  addRecipe,
  clearRecipes,
  deleteRecipe,
  deleteRecipeUser,
  setMyRecipes,
  startRecipeSorting,
  updateRecipe
} from "./recipe.actions";

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

        ...state.recipes.find((recipe, index) => {
          return recipe.recipeId === action.index;
          }),
        ...action.newRecipe
      }
      const updatedRecipes = [...state.recipes];
      const index = state.recipes.findIndex(recipe => recipe.recipeId === action.index);
      updatedRecipes[index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes
      }
    }
  ),

  on(clearRecipes, (state, action) => {
      return {
        ...state,
        recipes: [],
        myRecipes: [],
        otherRecipes: []
      }
    }
  ),
  on(deleteRecipe, (state, action) => {
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return recipe.recipeId !== action.index;
        })
      }
  }
),
  on(deleteRecipeUser, (state, action) => {
      const updatedRecipe = {

        ...state.recipes.find((recipe, index) => {
          return recipe.recipeId === action.index;
        }),
        ...action.recipe
      }
    updatedRecipe.userIds = updatedRecipe.userIds.filter((userId, index) => {
      return userId !== action.userId;
    });
      const updatedRecipes = [...state.recipes];
      const index = state.recipes.findIndex(recipe => recipe.recipeId === action.index);
      updatedRecipes[index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes
      }
    }
  )

)



