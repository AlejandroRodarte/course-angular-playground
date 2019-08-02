import { Component, OnInit } from '@angular/core';
import { UserService, UserProps, UserStatus } from './user.service';
import { CounterService } from './counter.service';

// root component
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [UserService, CounterService]
})
export class AppComponent implements OnInit {

	// list of users
	users: UserProps[] = [];

	// inject the user service
	constructor(private userService: UserService) {

	}

	// make the users property point to the users array in the service
	ngOnInit() {
		this.users = this.userService.users;
	}

}
