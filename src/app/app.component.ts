import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Store } from '@ngrx/store';

import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

// app component
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    // inject authentication service
    constructor(private store: Store<fromApp.AppState>) {

    }

    // when loading the whole app, attempt to login
    ngOnInit() {
        this.store.dispatch(new AuthActions.AutoLogin());
    }


}
