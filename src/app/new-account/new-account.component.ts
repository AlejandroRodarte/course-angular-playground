import { Component, EventEmitter, Output } from '@angular/core';

// new account component
@Component({
	selector: 'app-new-account',
	templateUrl: './new-account.component.html',
	styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {

	// accountAdded event emitter: listened by the root component
	@Output() 
	accountAdded = new EventEmitter<{name: string, status: string}>();

	// onCreateAccount() submission handler: receive account name and status
	onCreateAccount(accountName: string, accountStatus: string) {

		// emit the new account data for the root component to listen
		this.accountAdded.emit({
			name: accountName,
			status: accountStatus
		});

		console.log('A server status changed, new status: ' + accountStatus);

	}

}
