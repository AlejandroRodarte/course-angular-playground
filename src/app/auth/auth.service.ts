import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserModel } from './user.model';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

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

// authentication service
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // token expiration timer
    private tokenExpirationTimer: NodeJS.Timer;

    // inject http client and router to redirect user
    constructor(private http: HttpClient,
                private router: Router,
                private store: Store<fromApp.AppState>) {

    }

    // sign up request
    signup(email: string, password: string): Observable<FirebaseSignupResponse> {

        return this.http

                    // post user email and password to required URL and with our API Key
                    // we expect a response from Firebase of type FirebaseSignupResponse
                    .post<FirebaseSignupResponse>(
                        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
                        {
                            email,
                            password,
                            returnSecureToken: true
                        }
                    )

                    // pipe(): transform output
                    .pipe(

                        // catchError(): handle case when response is of type HttpErrorResponse 
                        // reference handleError() method to handle such case
                        catchError(
                            this.handleError
                        ),

                        // tap(): work with the firebase signup response
                        tap(

                            (responseData: FirebaseSignupResponse) => {

                                // call handleAuthentication() to register the user on the BehaviorSubject
                                this.handleAuthentication(
                                    responseData.email, 
                                    responseData.localId, 
                                    responseData.idToken, 
                                    +responseData.expiresIn
                                );

                            }

                        )

                    );

    }

    // login request
    login(email: string, password: string) {

        return this.http

                    // post user email and password to required URL and with our API Key
                    // we expect a response from Firebase of type FirebaseSigninResponse
                    .post<FirebaseSigninResponse>(
                        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
                        {
                            email,
                            password,
                            returnSecureToken: true
                        }
                    )

                    // pipe(): transform output
                    .pipe(

                        // catchError(): handle case when response is of type HttpErrorResponse 
                        // reference handleError() method to handle such case
                        catchError(this.handleError),

                        // tap(): work with the firebase signup response
                        tap(

                            (responseData: FirebaseSigninResponse) => {

                                // call handleAuthentication() to register the user on the BehaviorSubject
                                this.handleAuthentication(
                                    responseData.email, 
                                    responseData.localId, 
                                    responseData.idToken, 
                                    +responseData.expiresIn
                                );

                            }

                        )

                    );

    }

    // auto-login
    autoLogin(): void {

        // attempt to fetch user data from local storage
        const user: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        // if user does not exist: do nothing
        if (!user) {
            return;
        }

        // if user exists: use local storage data to create a new User instance
        const fetchedUser = new UserModel(
            user.email,
            user.id,
            user._token,
            new Date(user._tokenExpirationDate)
        )

        // access token getter to validate its expiration date
        if (fetchedUser.token) {

            // dispatch a login action with the user information
            this.store.dispatch(new AuthActions.Login({
                email: fetchedUser.email,
                userId: fetchedUser.id,
                token: fetchedUser.token,
                expirationDate: new Date(user._tokenExpirationDate)
            }));

            // calculate remaining time in milliseconds of user token
            const expirationDuration = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();

            // trigger auto-logout with the expiration duration
            this.autoLogout(expirationDuration)

        }

    }

    // logout
    logout() {

        // dispatch the logout action
        this.store.dispatch(new AuthActions.Logout());

        // redirect user to /auth
        this.router.navigate(['/auth']);

        // if the auto-logout timer was triggered before logging out, clear it
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }

        // remove user data from local storage if it exists
        localStorage.removeItem('userData');

    }

    // auto-logout: set timeout with an expiration duration
    // when finished, call logout()
    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration)
    }

    // authentication handler
    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {

        // create a new Date based on the current time and the token duration
        const expirationDate = new Date(
            new Date().getTime() + 
            expiresIn * 1000
        ); 

        // create user instance based on parameters received
        const user = new UserModel(
            email, 
            userId, 
            token, 
            expirationDate
        );

        // dispatch the login action
        this.store.dispatch(new AuthActions.Login({
            email: email,
            userId: userId,
            token: token,
            expirationDate: expirationDate
        }));

        // kickoff auto-logout timer
        this.autoLogout(expiresIn * 1000);

        // save user data on local storage
        localStorage.setItem('userData', JSON.stringify(user));

    }
    

    // handle HttpErrorResponse objects
    private handleError(errorResponse: HttpErrorResponse): Observable<never> {

        // error default message
        let errorMessage = 'An unknown error occured';

        // if the receiving object happens to not be of type HttpErrorResponse, return observable
        // with default error message
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }

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

        // return observable with the custom error message
        return throwError(errorMessage);

    }

}