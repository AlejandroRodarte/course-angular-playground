import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// when signing up with email/password on Firebase, we expect an object with these properties
export interface FirebaseSignupResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

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
                    );

    }

}