import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

    // inject the http client
    constructor(private http: HttpClient) {

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
                        catchError((errorResponse) => {

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
                                default:
                                    errorMessage = 'An error occured';
                                    break;

                            }

                            return throwError(errorMessage);

                        })
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
                    );

    }

}