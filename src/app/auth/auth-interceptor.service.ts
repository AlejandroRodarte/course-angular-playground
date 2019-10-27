import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { UserModel } from './user.model';

// update: authentication -> interceptor service to add to each subsequent request the user token
// we first subscribe to the user BehaviorSubject to fetch the current user data and immediately
// go back to working with the Observable of the HttpEvent to occur
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    // inject the authentication service
    constructor(private authService: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // access the user BehaviorSubject
        return this
            .authService
            .user
            .pipe(

                // take(), allows us to subscribe to get the current last emitted user from this BehaviorSubject
                // and immediately unsubscribe
                take(1),

                // exhaustMap(), allows us to work with the previous fetched value (the user model), but forces us to return a new
                // observable, which in this case will be an observable of the HttpEvent that is ongoing
                exhaustMap((user: UserModel) => {

                    // if the user is null (user has not even signup or login, we will not append a token)
                    if (user === null) {
                        return next.handle(req);
                    }

                    // set the token by cloning the request and adding it manually
                    const modifiedRequest = req.clone({
                        params: new HttpParams().set('auth', user.token)
                    });

                    // return the requires HttpEvent Observable so the intercept() return returns it
                    return next.handle(modifiedRequest);

                })

            );

    }

}