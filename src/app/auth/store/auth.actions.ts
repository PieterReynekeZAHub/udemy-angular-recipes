import {createAction, props} from "@ngrx/store";


export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const STOP_LOADING = '[Auth] Stop Loading';
export const SIGNUP_START = '[Auth] Signup Start';


export const loginStart = createAction(
  LOGIN_START,
  props<{
    email: string,
    password: string

  }>()
)

export const authenticateSuccess = createAction(
  AUTHENTICATE_SUCCESS,
  props<{
    email: string,
    userId: string,
    token: string,
    expirationDate: Date
  }>()
)

export const authenticateFail = createAction(
  AUTHENTICATE_FAIL,
  props<{ value: { error: string } }>()
)

export const logout = createAction(
  LOGOUT
)
export const stopLoading = createAction(
  STOP_LOADING
)

export const signupStart = createAction(
  SIGNUP_START,
  props<{
    email: string,
    password: string

  }>()
)

export const autoLogin = createAction(
  AUTO_LOGIN
)
