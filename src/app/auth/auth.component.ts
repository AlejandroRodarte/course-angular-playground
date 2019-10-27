import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, FirebaseAuthResponse } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {

    // toggle between login and signup
    isLoginMode: boolean = true;

    // flag active while loading (accessing server)
    isLoading: boolean = false;

    // error messsage property
    error: string = null;

    // get first element that implements the placeholder directive
    @ViewChild(PlaceholderDirective, { static : false })
    private alertHost: PlaceholderDirective;

    // close event emitter subscription
    private closeSubscription: Subscription;

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
        
        // view container reference of the first element in the DOM that has the appPlaceholder directive
        // with this view container reference we can add components inside it (the <ng-template>)
        const hostViewContainerRef = this.alertHost.viewContainerRef;

        // clear all components that have been rendered before inside this component
        hostViewContainerRef.clear();

        // now the use the component factory to create a component in the view container reference
        // get a reference to this component (type is actually ComponentRef)
        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);

        // the instance property of this component reference allows us to have access to its properties so
        // we can set data normally
        componentRef.instance.message = message;

        // subscribe to the close event emitter
        // basically the AlertComponent is subscribing to its own event emitter
        this.closeSubscription = componentRef.instance.close.subscribe(() => {

            // when data is emitted, unsubscribe and clear the view container reference to delete this component
            this.closeSubscription.unsubscribe();
            hostViewContainerRef.clear();

        });

    }

    // unsubscribe
    ngOnDestroy() {

        if (this.closeSubscription) {
            this.closeSubscription.unsubscribe();
        }

    }

}