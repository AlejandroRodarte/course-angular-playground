import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {

    // toggle between login and signup
    isLoginMode: boolean = true;

    // toggle handler
    onSwitchMode(): void {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(authForm: NgForm): void {
        console.log(authForm.value);
        authForm.reset();
    }

}