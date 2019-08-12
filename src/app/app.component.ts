// component parent node selector goes here
// component class definition goes here

import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

// this component will go inside an <app-root> html tag found on the index.html page
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

// component class definition
export class AppComponent implements OnInit {

    constructor(private authService: AuthService) {

    }

    // when loading the whole app, attempt to login
    ngOnInit() {
        this.authService.autoLogin();
    }


}
