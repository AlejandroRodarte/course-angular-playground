import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	// user id
	id: number;

	// load current route
	constructor(private route: ActivatedRoute) {

	}

	// subscribe to route params, extract id and assign to field value
	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			this.id = +params.id;
		});
	}
}
