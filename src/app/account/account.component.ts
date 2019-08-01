import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggingService } from '../logging.service';

// account component
// requiring to inject LoggingService to constructor
@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
    providers: [LoggingService]
})
export class AccountComponent {

    // receive the current account info from root component *ngFor directive
    @Input() 
    account: {name: string, status: string};

    // receive the id of the account (index of the *ngFor loop)
    @Input() 
    id: number;

    // constructor: required to inject to this component the logging service
    constructor(private loggingService: LoggingService) {

    }

    // event emitter: root component will listen for this statusChanged emitter
    @Output() 
    statusChanged = new EventEmitter<{id: number, newStatus: string}>();

    // onSetTo() event handler: emit data through the statusChanged emitter
    onSetTo(status: string) {

        // send the target accout id and the new status value
        this.statusChanged.emit({
            id: this.id, 
            newStatus: status}
        );

        // using the injected service to log data
        this.loggingService.logStatusChange(status);

    }

}
