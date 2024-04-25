import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import * as AuthActions from './auth.actions';
import {environment} from "../../../environments/environment";

import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../user.model";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer"
import {AuthService} from "../auth.service";

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
  const expirationDate = new Date(
    new Date().getTime() + expiresIn * 1000
  )
  const user = new User(email, userId, token, expirationDate)
  localStorage.setItem('userData', JSON.stringify(user))
  return AuthActions.authenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate

  });
};
const handleError = (errorRes) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(AuthActions.authenticateFail({value: {error: errorMessage}}));
    // Alternative syntax:
    // return of(
    //   new AuthActions.loginFail({error: errorMessage})
    // );
  }
  let errorResMessage = errorRes.error.error.message;
  switch (true) {
    case errorResMessage.includes('EMAIL_EXISTS'):
      errorMessage = 'This email exists already';
      break;
    case errorResMessage.includes('EMAIL_NOT_FOUND'):
      errorMessage = 'This email does not exist.';
      break;
    case errorResMessage.includes('INVALID_PASSWORD'):
      errorMessage = 'This password is not correct.';
      break;
    case errorResMessage.includes('TOO_MANY_ATTEMPTS_TRY_LATER'):
      errorMessage = 'Too many login attempts, please try again later'
  }
  return of(AuthActions.authenticateFail({value: {error: errorMessage}}));
  // Alternative syntax:
  // return of(
  //   new AuthActions.loginFail({error: errorMessage})
  // );
};

@Injectable()
export class AuthEffects {

  authLogin = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap((authData) => {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.apiKey,
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }).pipe(
          tap(responseData => {
            this.authService.setLogoutTimer(+responseData.expiresIn * 1000)
          }),
          map(responseData => {
            return handleAuthentication(+responseData.expiresIn, responseData.email, responseData.localId, responseData.idToken)
          }),
          catchError((errorRes) => {
            return handleError(errorRes)
          })
        );
      }),
    ));

  authRedirect = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.authenticateSuccess),
      tap(() => {
          console.log('Navigate for' + this.actions$)
          this.router.navigate(['/'])
          this.store.dispatch(AuthActions.stopLoading());
        }
      )
    ), {dispatch: false})

  authSignup = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap((authData) => {

        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.apiKey, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        ).pipe(
          tap(responseData => {
            this.authService.setLogoutTimer(+responseData.expiresIn * 1000)
          }),
          map(responseData => {
            return handleAuthentication(+responseData.expiresIn, responseData.email, responseData.localId, responseData.idToken)
          }),
          catchError((errorRes) => {
            return handleError(errorRes)
          })
        );
      }),
    ));

  authLogout = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(
        () => {
          localStorage.removeItem('userData');
          this.router.navigate(['/auth'])
          this.authService.clearExpirationTimer();
        }
      )), {dispatch: false});

  autoLogin = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(
        () => {
          const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
          } = JSON.parse(localStorage.getItem('userData'));
          if (!userData) {
            console.log("no User")
            return {type: 'DUMMY'};
          }
          const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
          if (loadedUser.token) {
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();

            this.authService.setLogoutTimer(expirationDuration)
            return AuthActions.authenticateSuccess({
              email: loadedUser.email,
              userId: loadedUser.id,
              token: loadedUser.token,
              expirationDate: new Date(userData._tokenExpirationDate)
            })

          }
          return {type: 'DUMMY'}
        }
      )
    )
  )


  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>, private authService: AuthService) {
  }


}
