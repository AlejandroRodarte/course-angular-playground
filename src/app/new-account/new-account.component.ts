import { Component } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from './../accounts.service';

// new account component
// providers property: services that should be injected into this component (LoggingService)
// we inform Angular that we desire to inject in the constructor an instance of the LoggingService class
// also inject the AccountsService
@Component({
	selector: 'app-new-account',
	templateUrl: './new-account.component.html',
	styleUrls: ['./new-account.component.css'],
	providers: [LoggingService, AccountsService]
})
export class NewAccountComponent {

	// dependency injection: inject a LoggingService instance automatically into the constructor
	// Angular handles in the background the creation of the new instance and injecting it through here
	// also inject an AccountsService instance
	constructor(private loggingService: LoggingService,
				private accountsService: AccountsService) {

	}

	// onCreateAccount() submission handler
	onCreateAccount(accountName: string, accountStatus: string) {

		// use the accountsService instance and use the addAccount() method to add an account
		this.accountsService.addAccount(accountName, accountStatus);

		// using the injected logging service instance to access its method and log message to console
		this.loggingService.logStatusChange(accountStatus);

	}

}
