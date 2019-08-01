import { Component, OnInit } from '@angular/core';
import { AccountsService } from './accounts.service';

// root component
// inject the AccountsService dependency
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [AccountsService]
})
export class AppComponent implements OnInit {

	// array of accounts
	accounts: { name : string, status: string }[] = [];

	// inject an AccountsService instance to this component
	constructor(private accountsService: AccountsService) {

	}

	// on initializing: make the accounts array point to the same location in memory
	// as the accounts array in the AccountsService
	// remember: arrays are reference types, so the equal operator just makes these two point
	// to the same place in memory
	ngOnInit() {
		this.accounts = this.accountsService.accounts;
	}

}
