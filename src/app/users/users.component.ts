import { Component } from '@angular/core';

// users component
@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent {

	// users component
	users = [
		{
			id: 1,
			name: 'Max'
		},
		{
			id: 2,
			name: 'Anna'
		},
		{
			id: 3,
			name: 'Chris'
		}
	];

}
