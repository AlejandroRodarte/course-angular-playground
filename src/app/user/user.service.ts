import { Injectable, EventEmitter } from '@angular/core';

import { Subject } from 'rxjs';

// alternative way to inform app-module.ts this will be a global service
@Injectable({
    providedIn: 'root'
})
export class UserService {

    // using a service (active observable)
    activatedEmitter = new Subject<boolean>();

}