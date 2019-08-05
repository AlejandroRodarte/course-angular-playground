import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from './user.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	// user id
	id: number;

	// load current route
	// inject user service
	constructor(private route: ActivatedRoute,
				private userSerivce: UserService) {

	}

	// subscribe to route params, extract id and assign to field value
	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			this.id = +params.id;
		});
	}

	// on activate handler, call next() on active observable to send data
	onActivate(): void {
		this.userSerivce.activatedEmitter.next(true);
	}

}
