import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import { UserModel } from './user.model';

import * as fromApp from '../store/app.reducer'
import * as fromAuth from './store/auth-reducer';
import { Store } from '@ngrx/store';

// http interceptor for authentication purposes
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    // inject authentication service
    constructor(private store: Store<fromApp.AppState>) {

    }

    // intercept implementation
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // access auth state from store
        return this
            .store
            .select('auth')
            .pipe(

                // take(): fetch latest auth state
                take(1),

                // map(): return from the auth state the user property so exhaustMap() can work with it
                map((authState: fromAuth.AuthReducerState) => {
                    return authState.user;
                }),

                // exhaustMap(): switch returned observable from UserModel to whatever the callback returned observable
                // handles (HttpEvent<any>)
                exhaustMap((user: UserModel) => {

                    // user null: do not attach token; continue with normal request
                    if (user === null) {
                        return next.handle(req);
                    }

                    // user not null: get clone of request and attach an 'auth' param with user token
                    const modifiedRequest = req.clone({
                        params: new HttpParams().set('auth', user.token)
                    });

                    // return Observable<HttpEvent<any>> by delivering modified request
                    return next.handle(modifiedRequest);

                })

            );

    }

}