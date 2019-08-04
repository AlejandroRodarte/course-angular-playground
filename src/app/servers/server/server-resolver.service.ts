import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from './../servers.service';
import { Injectable } from '@angular/core';

// server object literal structure
interface Server {
    id: number;
    name: string;
    status: string;
}

// injectable since we will inject to this service the serversService
// this server resolver service implements a Resolve class, which wraps the content to resolve
// which is a Server object literal type
@Injectable()
export class ServerResolverService implements Resolve<Server> {

    // inject the servers Service
    constructor(private serversService: ServersService) {

    }

    // Resolve interface requires to implement the resolve() method, we can return an observable, a promise or the literal object
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
        return this.serversService.getServer(+route.params['id']);
    }

}