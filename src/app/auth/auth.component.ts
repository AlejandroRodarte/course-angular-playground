import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';
import { AuthReducerState } from './store/auth.reducer';

// auth component
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {

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

    // store subscription
    private subscription: Subscription;

    // inject authentication service, router to redirect user in some cases and
    // the component factory resolver
    // inject the store
    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private store: Store<fromApp.AppState>) {

    }

    // initialization
    ngOnInit(): void {

        // susbscribe to the 'auth' slice of the store and dynamically change the component properties
        // in dependence of the state
        this.subscription = this.store.select('auth').subscribe((authState: AuthReducerState) => {

            this.isLoading = authState.loading;
            this.error = authState.authError;

            // in case of error, display AlertComponent
            if (this.error) {
                this.showErrorAlert(this.error);
            }

        });

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

        // login flag set:, dispatch LoginStart action
        // login flag clear, dispatch SignupStart action
        if (this.isLoginMode) {

            // dispatch LoginStart action (reaches AuthEffects and runs side-effect code, which in the end
            // dispatches a Login action for the reducer to work on)
            this.store.dispatch(new AuthActions.LoginStart({
                email,
                password
            }));

        } else {

            // dispatch SignupStart action
            this.store.dispatch(new AuthActions.SignupStart({
                email,
                password
            }));

        }

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
            this.store.dispatch(new AuthActions.ClearError());
        });

    }

    // on destroy, unsubscribe if we were subscribed to the 'close' event emitter
    ngOnDestroy() {

        if (this.closeSubscription) {
            this.closeSubscription.unsubscribe();
        }

        // unsubscribe from store
        this.subscription.unsubscribe();

    }

}