import { Component, OnInit, Input } from '@angular/core';
import { UserService, UserProps, UserStatus } from '../user.service';

// active user component
@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.css']
})
export class ActiveUserComponent implements OnInit {

	// receive the active user
	@Input()
	user: UserProps;

	// receive the id
	@Input()
	id: number;

	// receive the user service singleton
	constructor(private userService: UserService) {

	}

	ngOnInit() {

	}

	// setUserInactive(), set target user as inactive
	setUserInactive() {
		this.userService.updateUserStatus(this.id, UserStatus.Inactive);
	}

}
