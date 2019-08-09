import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

// authentication interceptos
export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // get a clone of the request and set a new header: all requests will have this header
        req = req.clone({
            setHeaders: {
                'interceptor-header': 'interceptor-value'
            }
        });

        console.log('request is on its way');

        // send the new request to continue its journey
        return next.handle(req);

    }
    
}