import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserModel } from './user.model';
import { Router } from '@angular/router';

// when signing up with email/password on Firebase, we expect an object with these properties
export interface FirebaseSignupResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

// firebase sign in response: same as sign up but with a registered boolean
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

    // user behavior subject to store a user when signing up or logging in
    // behavior subjects allow us to access the previous emitted value, this is so
    // our data storage service can check for the last emitted user (currently active user)
    // and attach its user token
    user = new BehaviorSubject<UserModel>(null);

    // token expiration timer
    private tokenExpirationTimer: NodeJS.Timer;

    // inject the http client
    constructor(private http: HttpClient,
                private router: Router) {

    }

    // sign up method
    signup(email: string, password: string): Observable<FirebaseSignupResponse> {

        // return post() observable, post the email and password
        // send as payload the email, password and a returnSecureToken flag set to true to get a JWT
        return this.http
                    .post<FirebaseSignupResponse>(
                        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4TpfoACG8AiUd4lEIlhyibeBtbVECIa8',
                        {
                            email,
                            password,
                            returnSecureToken: true
                        }
                    )
                    .pipe(

                        // instead of inserting as an argument an arrow function to work as the handler,
                        // we place a reference to our handleError() method (no parentheses), so that it receives
                        // injected the HttpErrorResponse
                        catchError(
                            this.handleError
                        ),

                        // tap() to execute some middle-ware function
                        tap(

                            // with the response data from firebase
                            (responseData: FirebaseSignupResponse) => {

                                // call the authentication method and pass in the returned email, user id, token and
                                // expiration timelapse
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

    // login() observable
    login(email: string, password: string) {

        // make the correct post() request to the correct endpoint
        return this.http
                    .post<FirebaseSigninResponse>(
                        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4TpfoACG8AiUd4lEIlhyibeBtbVECIa8',
                        {
                            email,
                            password,
                            returnSecureToken: true
                        }
                    )
                    .pipe(

                        // instead of inserting as an argument an arrow function to work as the handler,
                        // we place a reference to our handleError() method (no parentheses), so that it receives
                        // injected the HttpErrorResponse
                        catchError(this.handleError),

                        // tap() to execute some middle-ware function
                        tap(

                            // with the response data from firebase
                            (responseData: FirebaseSigninResponse) => {

                                // call the authentication method and pass in the returned email, user id, token and
                                // expiration timelapse
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

    // auto login
    autoLogin(): void {

        // fetch the user from local storage
        const user: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        // if null, send user to /auth
        if (!user) {
            this.router.navigate(['/auth']);
            return;
        }

        // if not null, cast JSON to a user model to access getter
        const fetchedUser = new UserModel(
            user.email,
            user.id,
            user._token,
            new Date(user._tokenExpirationDate)
        )

        // validate through getter if token has not expired
        // if expired, route to /auth; if not, set the user on subject
        if (fetchedUser.token) {

            this.user.next(fetchedUser);

            // calculate the expiration duration by substracting the expiration date from the current date
            const expirationDuration = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();

            // call auto logout to set the timer
            this.autoLogout(expirationDuration)

        } else {
            this.router.navigate(['/auth']);
        }

    }

    // logout: set user to null (disables recipes and management to user and forces to login/signup)
    // navigate to /auth
    // this is done in the service since we want to redirect the user no matter the component we are in
    logout() {

        this.user.next(null);
        this.router.navigate(['/auth']);

        // if the auto-logout timer was triggered, then clear it
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }

        // clear the user data local storage item
        localStorage.removeItem('userData');

    }

    // auto-logout
    autoLogout(expirationDuration: number) {

        // start up directly a timeout and wait for an amount of time equivalent
        // to the expiration duration (token expiration date minus current date)
        // when finishing, call logout()
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration)

    }

    // handler for authentication
    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {

        // the expiration date must be calculated, it must be a date in the future relative to the current time
        // new Date().getTime() gets us the current time in milliseconds starting at some time at 1970
        // to this, we add expiresIn, which is a time in seconds, so we multiply it by 1000 to handle the same units
        const expirationDate = new Date(
            new Date().getTime() + 
            expiresIn * 1000
        ); 

        // create the user model
        const user = new UserModel(
            email, 
            userId, 
            token, 
            expirationDate
        );

        // store the user for subscribers
        this.user.next(user);

        this.autoLogout(expiresIn * 1000);

        // save the current user object into local storage (need to convert to a string first)
        localStorage.setItem('userData', JSON.stringify(user));

    }
    

    // transform HttpErrorResponse to custom error message
    // outsoutce the custom error message generation to this method
    private handleError(errorResponse: HttpErrorResponse): Observable<never> {

        // to customize error, we can use pipe() with the catchError() operator, which should ALWAYS return
        // an observable under the name of throwError(), where we can pass to it as an argument whatever we want
        // our subscribers to receive as an error indicator (in this case, a customized error message)
        let errorMessage = 'An unknown error occured';

        // check if the received error has the correct format from Firebase; if not, send default error message through
        // the observable
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }

        // use a switch statement that checks for the Firebase error message and...
        switch (errorResponse.error.error.message) {

            // customize our message to send through the observable depending on each particular case
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

        // return an observable with the custom error message
        return throwError(errorMessage);

    }

}