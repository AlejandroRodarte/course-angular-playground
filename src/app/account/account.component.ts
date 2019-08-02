import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

// account component
// requiring to inject LoggingService to constructor
// do not place the AccountsService dependency, since we will receive the singleton instance from the parent component

// the accountsService is now in the AppModule, so all components share the same singleton service
@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
    // providers: [LoggingService]
})
export class AccountComponent {

    // receive the current account info from root component *ngFor directive
    @Input() 
    account: {name: string, status: string};

    // receive the id of the account (index of the *ngFor loop)
    @Input() 
    id: number;

    // constructor: required to inject to this component the logging service
    // also inject an AccountsService instance coming from parent component (hierarchical injector)

    // inject the inherited AccountsService instance to this component from AppModule
    constructor(private loggingService: LoggingService, 
                private accountsService: AccountsService) {

    }

    // onSetTo() event handler
    onSetTo(status: string) {
        
        // use the accountsService instance to update the status with the id and the new status
        this.accountsService.updateStatus(this.id, status);

        // use the accountsService instance to access the event emitter and emit some data
        // this allows for cross-component communication
        this.accountsService.statusUpdated.emit(status);

        // using the injected service to log data
        // this.loggingService.logStatusChange(status);

    }

}
