import {createReducer, on} from "@ngrx/store";
import {User} from "../user.model";
import {authenticateSuccess, authenticateFail, loginStart, logout, stopLoading, signupStart} from "./auth.actions";


export interface State {
  user: User,
  authError: string;
  loading: boolean;
}

const initialState = {
  user: null,
  authError: null,
  loading: false
};

export const authReducer = createReducer(
  initialState,

  on(authenticateSuccess, (state, action) => {
    const user = new User(action.email, action.userId, action.token, action.expirationDate)
    return {
      ...state,
      authError: null,
      user: user,
      loading: true
    }
  }),
  on(logout, (state) => {
    return {...state, user: null}
  }),
  on(loginStart, signupStart, (state, action) => {
    return {
      ...state,
      authError: null,
      loading: true
    }
  }),
  on(authenticateFail, (state, action) => {
    return {
      ...state,
      user: null,
      authError: action.value.error,
      loading: false
    }
  }),
  on(stopLoading, (state) => {
    return {...state, loading: false}
  })
)

