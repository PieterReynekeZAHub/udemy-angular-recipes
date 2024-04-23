import {createAction, props} from "@ngrx/store";


export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';

export const login = createAction(
  LOGIN,
  props<{
    value: {
      email: string,
      userId: string,
      token: string,
      expirationDate: Date
    }
  }>()
)

export const logout = createAction(
  LOGOUT
)
