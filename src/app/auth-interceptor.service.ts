import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// authentication interceptos
export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // clone the request and append a new header
        const modifiedRequest = req.clone({
            headers: req.headers.append('auth', 'xyz')
        });

        console.log('request is on its way');
        console.log(req.url);

        // send the new request to continue its journey
        return next
                .handle(modifiedRequest)
                .pipe(
                    tap(event => {

                        if (event.type === HttpEventType.Response) {
                            console.log('response arrived: body data: ');
                            console.log(event.body);
                        }

                    })
                );

    }
    
}