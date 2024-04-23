import {createReducer, on} from "@ngrx/store";
import {User} from "../user.model";
import {login, logout} from "./auth.actions";


export interface State {
  user: User
}

const initialState = {
  user: null
};

export const authReducer = createReducer(
  initialState,

  on(login, (state, action) => {
    const user = new User(action.value.email, action.value.userId, action.value.token, action.value.expirationDate)
    return {
      ...state,
      user: user
    }
  }),
  on(logout, (state) =>{
    return{...state, user: null}
  })
)
