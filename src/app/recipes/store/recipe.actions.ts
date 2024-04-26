import {createAction, props} from "@ngrx/store";
import {Recipe} from "../recipe.model";

export const START_RECIPE_SORTING = '[Recipe] Start Recipe Sorting';
export const SET_RECIPES = '[Recipe] Set Recipes';
export const SET_MY_RECIPES = '[Recipe] Set My Recipes';
export const SET_OTHER_RECIPES = '[Recipe] Set Other Recipes';
export const ADD_RECIPE = '[Recipe] Add Recipe';
export const UPDATE_RECIPE = '[Recipe] Update Recipe';
export const DELETE_RECIPE = '[Recipe] Delete Recipe';
export const STORE_RECIPES = '[Recipe] Store Recipes';
export const FETCH_RECIPES = '[Recipe] Fetch Recipes';
export const CLEAR_RECIPES = '[Recipe] Clear Recipes';

export const setRecipes = createAction(
  SET_RECIPES,
  props<{ recipes: Recipe[] }>()
)

export const setMyRecipes = createAction(
  SET_MY_RECIPES,
  props<{ recipes: { recipes: Recipe[], myRecipes: Recipe[], otherRecipes: Recipe[] } }>()
)

export const setOtherRecipes = createAction(
  SET_OTHER_RECIPES,
  props<{ recipes: Recipe[] }>()
)

export const startRecipeSorting = createAction(
  START_RECIPE_SORTING,
  props<{ recipes: Recipe[] }>()
)

export const addRecipe = createAction(
  ADD_RECIPE,
  props<{ recipe: Recipe }>()
)

export const updateRecipe = createAction(
  UPDATE_RECIPE,
  props<{ index: string, newRecipe: Recipe }>()
)

export const deleteRecipe = createAction(
  DELETE_RECIPE,
  props<{ index: number }>()
)

export const storeRecipes = createAction(
  STORE_RECIPES
)

export const fetchRecipes = createAction(
  FETCH_RECIPES
)

export const clearRecipes = createAction(
  CLEAR_RECIPES
)
