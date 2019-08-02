import { LoggingService } from './logging.service';
import { Injectable } from '@angular/core';

// accounts service: will receive a logging service dependency
// so it its @Injectable
@Injectable()
export class AccountsService {

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

    // constructor injection to receive logging service
    constructor(private loggingService: LoggingService) {

    }
    
    // add an account: push the new account data to the array
    addAccount(name: string, status: string): void {
        this.accounts.push({ name: name, status: status });
        this.loggingService.logStatusChange(status);
    }

    // update an account: set the new status of the target account by id
    updateStatus(id: number, newStatus: string): void {
        this.accounts[id].status = newStatus;
        this.loggingService.logStatusChange(newStatus);
    }

}