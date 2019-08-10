import { Component } from '@angular/core';

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

}