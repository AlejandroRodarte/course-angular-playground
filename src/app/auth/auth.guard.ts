import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserModel } from './user.model';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as fromApp from '../store/app.reducer'
import * as fromAuth from './store/auth.reducer';
import { Store } from '@ngrx/store';

// authentication guard
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    // inject authentication service and router in case we need to redirect user
    constructor(private router: Router,
                private store: Store<fromApp.AppState>) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        // access auth state
        return this
                .store
                .select('auth')
                .pipe(

                    // take(): fetch latest auth state
                    take(1),

                    // map(): access auth state and use the user property so the next map() can work with it
                    map((authState: fromAuth.AuthReducerState) => {
                        return authState.user;
                    }),

                    // map(): work with fetched user data
                    map((user: UserModel) => {

                        // user null: user is not authenticated
                        // user exists: user is authenticated
                        const isUserAuthenticated: boolean = !user ? false : true;

                        // if authenticated, grant access to route
                        // if not authenticated, redirect user to /auth
                        if (isUserAuthenticated) {
                            return true;
                        } else {
                            return this.router.createUrlTree(['/auth']);
                        }

                    })

                );

    }

}