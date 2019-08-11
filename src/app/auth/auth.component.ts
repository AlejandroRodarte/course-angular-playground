import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, FirebaseAuthResponse } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';

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

    // using the component factory resolver to let angular instantiate components
    // we desire to add dynamically
    constructor(private authService: AuthService,
                private router: Router,
                private componentFactoryResolver: ComponentFactoryResolver) {

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

        // set loading flag
        this.isLoading = true;

        // authentication action, login() or signup() observable
        // FirebaseAuthResponse = FirebaseSigninResponse | FirebaseSignupResponse
        let authAction: Observable<FirebaseAuthResponse>;

        // if we are on login mode, use the login() observer
        if (this.isLoginMode) {
            authAction = this.authService.login(email, password);
        } else {
            // if signing up, use the signup() observer
            authAction = this.authService.signup(email, password);
        }

        // on both cases, we get an observer we can subscribe to and get some response data
        // we set the loading flag to false regardless if we get an error or not
        // and in case of an custom error message we simply set its value to the component property

        // thanks to the catchError() operator, which returns a throwError() observable so that we can still
        // subscribe to wait for an error to pop up, we return as an argument a customized error message, not the full
        // HttpErrorResponse object, so we can simply set the error property to the error message we get from there
        authAction
            .subscribe((responseData: FirebaseAuthResponse) => {

                console.log(responseData);
                this.isLoading = false;

                // on successful login or signup, go to /recipes
                this.router.navigate(['/recipes']);

            }, (errorMessage: string) => {

                this.error = errorMessage;
                this.isLoading = false;

                // imperative way of loading dynamic components: load it through a method
                this.showErrorAlert(errorMessage);

            });

        authForm.reset();

    }

    // child event emitter handler: set error strng to null
    onHandleError() {
        this.error = null;
    }

    // display error alery
    private showErrorAlert(message: string) {

        // using the component factory resolver to create a FACTORY of alert components
        // this object now knows how to create AlertComponents
        const alertComponentFactory = this
                                        .componentFactoryResolver
                                        .resolveComponentFactory(
                                            AlertComponent
                                        );
        
        // to know where to place the component

    }

}