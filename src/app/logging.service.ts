import { Injectable } from '@angular/core';

// dummy service to test different service injector methods

// @Injectable({
//     providedIn: 'root'
// })
export class LoggingService {

    lastLog: string;

    // log new message, log last message and
    // replace last message with new message
    printLog(message: string): void {
        console.log(message);
        console.log(this.lastLog);
        this.lastLog = message;
    }

}