import {createAction, props} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS'
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT'
export const START_EDIT = 'START_EDIT'
export const STOP_EDIT = 'STOP_EDIT'

export const addIngredient = createAction(
  ADD_INGREDIENT,
  props<{ value: Ingredient }>()
)

export const addIngredients = createAction(
  ADD_INGREDIENTS,
  props<{value : Ingredient[]}>()
)

export const updateIngredient = createAction(
  UPDATE_INGREDIENT,
  props<{ ingredient: Ingredient}>()
)

export const deleteIngredient = createAction(
  DELETE_INGREDIENT

)

export const startEdit = createAction(
  START_EDIT,
  props<{index: number}>()
)

export const stopEdit = createAction(
  STOP_EDIT
)
