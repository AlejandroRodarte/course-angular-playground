import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import {isPlatformBrowser} from '@angular/common';

// app component
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    // inject authentication service
    // inject the platform id (server or browser)
    constructor(private store: Store<fromApp.AppState>,
                @Inject(PLATFORM_ID) private platformId) {

    }

    // when loading the whole app, attempt to login
    // apply isPlatformBrowser() to determine whether code is ran on the browser or on the server
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.store.dispatch(new AuthActions.AutoLogin());
        }
    }

}
