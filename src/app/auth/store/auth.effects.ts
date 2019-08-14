import { Actions, ofType, Effect } from '@ngrx/effects'
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// firebase response when signing up through email/password
export interface FirebaseSignupResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

// firebase response when signing in same as signing up but with a registered boolean
export interface FirebaseSigninResponse extends FirebaseSignupResponse {
    registered: boolean;
}

// union type for all types of responses (signin and signup)
export type FirebaseAuthResponse = FirebaseSignupResponse | FirebaseSignupResponse;

const handleAuthentication = (
    email: string, 
    userId: string, 
    token: string, 
    expiresIn: number) => {

    // calculate expiration data
    const expirationDate = new Date(
        new Date().getTime() + 
        expiresIn * 1000
    ); 

    // return new observable of the action we desire to dispatch (automatically handled by
    // NgRx effects through the @Effect decorator)
    // dispatch the Login action to set the new user on the auth state
    // this is an example on how after some side effect code using an @Effect we can then
    // dispatch an action for a reducer to handle now to update some state

    // this would become the global observable
    return new AuthActions.AuthenticateSuccess({
        email,
        userId,
        token,
        expirationDate
    });

};

const handleError = (errorResponse: HttpErrorResponse) => {

    // error default message
    let errorMessage = 'An unknown error occured';

    // throwError() cant be used since we should never return en error observable since
    // it kills the actions$ observable

    // evaluate cases for the error message we get from the HttpErrorResponse object
    // and customize our own message
    switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists';
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist';
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct';
            break;
        default:
            errorMessage = 'An error occured';
            break;
    }

    // return new observable with of() which wraps the LoginFail (now AuthenticateFail) action which will be
    // dispatched automatically by NgRx
    return of(
        new AuthActions.AuthenticateFail(errorMessage)
    );

};

// effects are organized in classes
// to make effects valid, we need to use @Injectable so that actions and the http client can be injected
// into this class
@Injectable()
export class AuthEffects {

    @Effect()
    authSignup = this
                    .actions$
                    .pipe(
                        
                        // listen for SIGNUP_START action
                        ofType(AuthActions.SIGNUP_START),

                        // switch observable to whatever the callback returns
                        switchMap((signupData: AuthActions.SignupStart) => {

                            // post the user to register, expect an FirebaseSignupResponse observable
                            return this.http
                                        .post<FirebaseSignupResponse>(
                                            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
                                            {
                                                email: signupData.payload.email,
                                                password: signupData.payload.password,
                                                returnSecureToken: true
                                            }
                                        )
                                        .pipe(

                                            // map() to wrap AuthenticationSuccess action on an observable and return it
                                            // so it becomes the global observable
                                            map(

                                                (responseData: FirebaseSignupResponse) => {
                                                    return handleAuthentication(
                                                        responseData.email,
                                                        responseData.localId,
                                                        responseData.idToken,
                                                        +responseData.expiresIn
                                                    );
                                                }

                                            ),

                                            // error handling managed by outer function, return of() observable with
                                            // custom error message
                                            catchError((errorResponse: HttpErrorResponse) => {
                                                return handleError(errorResponse);
                                            })

                                        );

                        })
                        
                    )

    // action handler: defined as a regular property
    // subscribe to the observable of actions to listen to action dispatches from components/services
    // (similar to reducers)
    @Effect()
    authLogin = this

                    // .actions$: observable of actions
                    .actions$
                    .pipe(

                        // ofType() filter: continue in observable chain only if the action type
                        // is of type LOGIN_START (similar to switch statement)
                        // comma-separated values for multiple actions

                        // ofType(AuthActions.LOGIN_START): observable of AuthActions.LoginStart action payload
                        ofType(AuthActions.LOGIN_START),

                        // switchMap(): create a new observable based on another observable's data
                        // from an observable of actions to an observable that will resolve the FirebaseSigninResponse response
                        // the ofType() filter ensures the payload we will get comes from Action LoginStart

                        // switchMap(): the returned observable becomes the new global observable
                        switchMap((authData: AuthActions.LoginStart) => {

                            // initialize the post() request to login with payload information: expect response FirebaseSigninResponse from server
                            // .post: observable of FirebaseSigninResponse
                            return this.http
                                        .post<FirebaseSigninResponse>(
                                            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
                                            {
                                                email: authData.payload.email,
                                                password: authData.payload.password,
                                                returnSecureToken: true
                                            }
                                        )
                                        .pipe(

                                            // map(): returns an observable of what the callback returns (in this case, it becomes the
                                            // global observable)

                                            // map() automatically wraps whatever it returns into an observable
                                            map((responseData: FirebaseSigninResponse) => {
                                                return handleAuthentication(
                                                    responseData.email,
                                                    responseData.localId,
                                                    responseData.idToken,
                                                    +responseData.expiresIn
                                                );
                                            }),

                                            // catchError(): must NOT return an error observable, since it would become the new
                                            // global observable and would kill the 'actions' observable
                                            // solution: use of() to create new non-error observable (empty observable, for now)
                                            catchError((errorResponse: HttpErrorResponse) => {
                                                return handleError(errorResponse);
                                            })

                                        )

                        }),

                    );
    
    // dispatch: false -> notify NgRx this effect will not dispatch an action at the end of the code
    // just route the user man
    @Effect({
        dispatch: false
    })
    authSuccess = this
                    .actions$
                    .pipe(

                        // run code only when LOGIN action is dispatched
                        ofType(AuthActions.AUTHENTICATE_SUCCESS),

                        // tap(): execute middleware function
                        // route user to root
                        tap(
                            () => {
                                this.router.navigate(['/']);
                            }
                        )
                    
                    )
            

    // actions ($ is a convention to mark the variable as an observable)
    // huge observable that gives us access to all dispatch actions so that we
    // we do not change any state (since side effect code should not), but the idea of this
    // is that we can still execute code based on action types, just as reducer functions
    constructor(private actions$: Actions,
                private http: HttpClient,
                private router: Router) {

    }

}