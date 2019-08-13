import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { UserModel } from './user.model';

// http interceptor for authentication purposes
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    // inject authentication service
    constructor(private authService: AuthService) {

    }

    // intercept implementation
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // access user BehaviorSubject and enter pipe to transform output
        return this
            .authService
            .user
            .pipe(

                // take(): fetch latest emitted user data and unsubscribe from such BehaviorSubject
                take(1),

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