import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

// user component
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

	// store a single user
	user: {id: number, name: string};

	// subscription to the parameters observable
	paramsSubscription: Subscription;

	// inject the activated route
	// besides having the path that loaded this component, has more route metadata
	constructor(private route: ActivatedRoute) { 

	}

	ngOnInit() {

		// access the loaded route instance
		// its snapshot property has a picture of the final path (with id and user params)
		// access the params property inside and fetch the params you desire
		this.user = {
			id: this.route.snapshot.params['id'],
			name: this.route.snapshot.params['name']
		};

		this.paramsSubscription = this.route.params.subscribe((params: Params) => {
			this.user.id = params['id'];
			this.user.name = params['name'];
		})

	}

	ngOnDestroy() {
		this.paramsSubscription.unsubscribe();
	}

}
