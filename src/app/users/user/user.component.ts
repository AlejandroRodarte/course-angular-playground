import { Component, OnInit } from '@angular/core';

// user component
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	// store a single user
	user: {id: number, name: string};

	constructor() { 

	}

	ngOnInit() {
		
	}

}
