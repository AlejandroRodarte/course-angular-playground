import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

// authentication guard service: must implement CanActivate interface
// make this service receive other services (AuthService)
@Injectable()
export class AuthGuardService implements CanActivate {

    // injections: AuthService and router to navigate and redirect user
    constructor(private authService: AuthService, 
                private router: Router) {

    }

    // canActivate() implementation: returns a boolean, a promise with a resolved boolean or an observable of a boolean
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        // call the isAuthenthicated() dummy method which returns a promise of a boolean
        // after resolved, we will check for the loggedIn boolean
        // if true, return true, if not, access the router and redirect user to root url
        // navigate() returns a Promsie<boolean>
        return this.authService.isAuthenthicated()
            .then((loggedIn: boolean) => {
                if (loggedIn) {
                    return true;
                } else {
                    this.router.navigate(['/']);
                }
            })

    }

}