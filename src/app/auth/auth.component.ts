import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, FirebaseAuthResponse } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';

// auth component
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {

    // toggle between login and signup
    isLoginMode: boolean = true;

    // flag that is active while loading data
    isLoading: boolean = false;

    // error message
    error: string = null;

    // get first element that implements the placeholder directive
    @ViewChild(PlaceholderDirective, { static : false })
    private alertHost: PlaceholderDirective;

    // close event emitter subscription
    private closeSubscription: Subscription;

    // inject authentication service, router to redirect user in some cases and
    // the component factory resolver
    constructor(private authService: AuthService,
                private router: Router,
                private componentFactoryResolver: ComponentFactoryResolver) {

    }

    // toggle handler: switch between signup and login
    onSwitchMode(): void {
        this.isLoginMode = !this.isLoginMode;
    }

    // on submit form handler
    onSubmit(authForm: NgForm): void {

        // form invalid: do nothing
        if (!authForm.valid) {
            return;
        }

        // form valid: get email and password from form
        const email = authForm.value.email;
        const password = authForm.value.password;

        // set loading flag
        this.isLoading = true;

        // authentication action, login() or signup() observable
        // FirebaseAuthResponse = FirebaseSigninResponse | FirebaseSignupResponse
        let authAction: Observable<FirebaseAuthResponse>;

        // login flag set:, use the login() observer
        // login flag clear: use the signup() observer
        if (this.isLoginMode) {
            authAction = this.authService.login(email, password);
        } else {
            authAction = this.authService.signup(email, password);
        }

        // subscribe to final observer and get the response data from Firebase (FirebaseSigninResponse | FirebaseSignupResponse)
        // note: not needed in this case, but placed to display we can acquire it
        authAction

            // success response
            .subscribe((responseData: FirebaseAuthResponse) => {

                // clear loading flag
                this.isLoading = false;

                // on successful login or signup, go to /recipes
                this.router.navigate(['/recipes']);

            }, 
            
            // failure response: get custom error message (thanks to catchError RxJS operator)
            (errorMessage: string) => {

                // clear loading flag
                this.isLoading = false;

                // load error message to property
                this.error = errorMessage;

                // call method that loads dynamic AlertComponent with message
                this.showErrorAlert(errorMessage);

            });

        // clear the form
        authForm.reset();

    }

    // display dynamic AlertComponent
    private showErrorAlert(message: string) {

        // create factory of AlertComponents
        const alertComponentFactory = this
                                        .componentFactoryResolver
                                        .resolveComponentFactory(
                                            AlertComponent
                                        );
        
        // get view container reference from <ng-template> with the PlaceholderDirective
        const hostViewContainerRef = this.alertHost.viewContainerRef;

        // clear all components inside this <ng-template>
        hostViewContainerRef.clear();

        // create a new AlertComponent through its factory and get a reference
        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);

        // access the 'message' AlertComponent property and set it with the error message parameter value
        componentRef.instance.message = message;

        // subscribe to the AlertComponent's 'close' Event Emitter, triggered when the user clicks the 'close'
        // button on the component
        // simply unsubscribe directly and clear all components inside the <ng-template>
        this.closeSubscription = componentRef.instance.close.subscribe(() => {
            this.closeSubscription.unsubscribe();
            hostViewContainerRef.clear();
        });

    }

    // on destroy, unsubscribe if we were subscribed to the 'close' event emitter
    ngOnDestroy() {
        if (this.closeSubscription) {
            this.closeSubscription.unsubscribe();
        }
    }

}