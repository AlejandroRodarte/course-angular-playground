import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, FirebaseSignupResponse } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {

    // toggle between login and signup
    isLoginMode: boolean = true;

    // flag active while loading (accessing server)
    isLoading: boolean = false;

    // error messsage property
    error: string = null;

    constructor(private authService: AuthService) {

    }

    // toggle handler
    onSwitchMode(): void {
        this.isLoginMode = !this.isLoginMode;
    }

    // on submit
    onSubmit(authForm: NgForm): void {

        // check if form is valid
        if (!authForm.valid) {
            return;
        }

        // get email and password from form
        const email = authForm.value.email;
        const password = authForm.value.password;

        this.isLoading = true;

        // if we are on login mode
        if (this.isLoginMode) {

        } else {

            // if user is signing up, subscribe to the signup() observable returned and log the response
            // this should register the user into the Firebase server

            // either if we are successful or get an error, set the loading flag to false
            // on error, set error property to a hardcoded string
            this.authService
                .signup(email, password)
                .subscribe((responseData: FirebaseSignupResponse) => {
                    console.log(responseData);
                    this.isLoading = false;
                }, (error) => {
                    this.error = 'An error occured';
                    this.isLoading = false;
                });

        }

        authForm.reset();

    }

}