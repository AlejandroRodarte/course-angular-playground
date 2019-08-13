import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserModel } from './user.model';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

// authentication guard
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    // inject authentication service and router in case we need to redirect user
    constructor(private authService: AuthService,
                private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        // access user BehaviorSubject
        return this
                .authService
                .user
                .pipe(

                    // take(): fetch latest emitted user and unsubscribe and unsubscribe from such BehaviorSubject
                    take(1),

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