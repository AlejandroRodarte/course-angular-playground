import { Actions, ofType, Effect } from '@ngrx/effects'
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { of } from 'rxjs';

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

// effects are organized in classes
export class AuthEffects {

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

                                            // catchError(): must NOT return an error observable, since it would become the new
                                            // global observable and would kill the 'actions' observable
                                            // solution: use of()
                                            catchError((error: HttpErrorResponse) => {
                                                of();
                                            }),

                                            // map(): use of() to return a new observable
                                            map((responseData: FirebaseSigninResponse) => {
                                                of();
                                            })

                                        )

                        }),

                    );

    // actions ($ is a convention to mark the variable as an observable)
    // huge observable that gives us access to all dispatch actions so that we
    // we do not change any state (since side effect code should not), but the idea of this
    // is that we can still execute code based on action types, just as reducer functions
    constructor(private actions$: Actions,
                private http: HttpClient) {

    }

}