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

    constructor(private authService: AuthService,
                private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        // fetch the latest registered user with take() by subscribing and unsubscribing
        return this
                .authService
                .user
                .pipe(

                    take(1),

                    map((user: UserModel) => {

                        // check if ther is not null
                        const isUserAuthenticated: boolean = !user ? false : true;

                        // if not null, then return true and load the route's component
                        // if null, route the user to /auth
                        if (isUserAuthenticated) {
                            return true;
                        } else {
                            return this.router.createUrlTree(['/auth']);
                        }

                    })

                );

    }

}