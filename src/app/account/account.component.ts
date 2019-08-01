import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

// account component
// requiring to inject LoggingService to constructor
// also inject the AccountsService
@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
    providers: [LoggingService, AccountsService]
})
export class AccountComponent {

    // receive the current account info from root component *ngFor directive
    @Input() 
    account: {name: string, status: string};

    // receive the id of the account (index of the *ngFor loop)
    @Input() 
    id: number;

    // constructor: required to inject to this component the logging service
    // also inject an instance of the accountsService
    constructor(private loggingService: LoggingService, 
                private accountsService: AccountsService) {

    }

    // onSetTo() event handler
    onSetTo(status: string) {
        
        // use the accountsService instance to update the status with the id and the new status
        this.accountsService.updateStatus(this.id, status);

        // using the injected service to log data
        this.loggingService.logStatusChange(status);

    }

}
