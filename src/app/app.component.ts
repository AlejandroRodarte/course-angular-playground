import { Component, OnInit } from '@angular/core';
import { AccountsService } from './accounts.service';

// root component
// the accountsService is now in the AppModule, so all components share the same singleton service
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	// array of accounts
	accounts: { name : string, status: string }[] = [];

	// inject the inherited AccountsService instance to this component from AppModule
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
