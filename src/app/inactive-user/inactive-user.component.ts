import { Component, OnInit, Input } from '@angular/core';
import { UserProps, UserService, UserStatus } from '../user.service';

// inactive user component
@Component({
  selector: 'app-inactive-user',
  templateUrl: './inactive-user.component.html',
  styleUrls: ['./inactive-user.component.css']
})
export class InactiveUserComponent implements OnInit {

	// receive the inactive user
	@Input()
	user: UserProps;

	// receive the index where the inactive user was found
	@Input()
	id: number;

	// receive the user service singleton
	constructor(private userService: UserService) {

	}

	ngOnInit() {

	}

	// setUserActive() event handler, access the user service
	setUserActive() {
		this.userService.updateUserStatus(this.id, UserStatus.Active);
	}

}
