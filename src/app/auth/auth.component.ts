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

        // if we are on login mode
        if (this.isLoginMode) {

        } else {

            // if user is signing up, subscribe to the signup() observable returned and log the response
            // this should register the user into the Firebase server
            this.authService
                .signup(email, password)
                .subscribe((responseData: FirebaseSignupResponse) => {
                    console.log(responseData);
                }, (error) => {
                    console.log(error);
                });

        }

        authForm.reset();

    }

}