import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

// app component
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    // inject authentication service
    constructor(private authService: AuthService) {

    }

    // when loading the whole app, attempt to login
    ngOnInit() {
        this.authService.autoLogin();
    }


}
