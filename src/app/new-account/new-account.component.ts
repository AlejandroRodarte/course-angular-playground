import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingService } from '../logging.service';

// new account component
// providers property: services that should be injected into this component (LoggingService)
// we inform Angular that we desire to inject in the constructor an instance of the LoggingService class
@Component({
	selector: 'app-new-account',
	templateUrl: './new-account.component.html',
	styleUrls: ['./new-account.component.css'],
	providers: [LoggingService]
})
export class NewAccountComponent {

	// accountAdded event emitter: listened by the root component
	@Output() 
	accountAdded = new EventEmitter<{name: string, status: string}>();

	// dependency injection: inject a LoggingService instance automatically into the constructor
	// Angular handles in the background the creation of the new instance and injecting it through here
	constructor(private loggingService: LoggingService) {

	}

	// onCreateAccount() submission handler: receive account name and status
	onCreateAccount(accountName: string, accountStatus: string) {

		// emit the new account data for the root component to listen
		this.accountAdded.emit({
			name: accountName,
			status: accountStatus
		});

		// using the injected logging service instance to access its method and log message to console
		this.loggingService.logStatusChange(accountStatus);

	}

}
