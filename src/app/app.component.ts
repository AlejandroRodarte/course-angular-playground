import { Component } from '@angular/core';

// root component
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	// array of account object literals
	accounts = [
		{
			name: 'Master Account',
			status: 'active'
		},
		{
			name: 'Testaccount',
			status: 'inactive'
		},
		{
			name: 'Hidden Account',
			status: 'unknown'
		}
	];

	// onAccountAdded() handler: receive account name and status
	// push the new account to the accounts array
	onAccountAdded(newAccount: {name: string, status: string}) {
		this.accounts.push(newAccount);
	}

	// onStatusChanged() handler: receive the account id and new status
	// target the account by the index (id) and set the status property to the new status value
	onStatusChanged(updateInfo: { id: number, newStatus: string }) {
		this.accounts[updateInfo.id].status = updateInfo.newStatus;
	}

}
