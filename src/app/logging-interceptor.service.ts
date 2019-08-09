import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// logging interceptor
export class LoggingInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // log the url and headers
        console.log('outgoing request');
        console.log(req.url);
        console.log(req.headers);

        // return an observable that will have prepended a tap() operator that will log more stuff
        return next
                .handle(req)
                .pipe(
                    tap(event => {
                        if (event.type === HttpEventType.Response) {
                            console.log('incoming response');
                            console.log(event.body);
                        }
                    })
                );

    }

}