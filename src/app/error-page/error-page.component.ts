import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

// error page component
@Component({
	selector: 'app-error-page',
	templateUrl: './error-page.component.html',
	styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

	// error message to render
	errorMessage: string;

	// inject the current route
	constructor(private route: ActivatedRoute) { 

	}

	// on initialization
	ngOnInit() {

		// access the current route's snapshot and access the data object literal
		// we set on app-routing.module.ts and access the 'message' key value
		this.errorMessage = this.route.snapshot.data['message'];

		// we can also subscribe to this data if it happens to change
		this.route.data.subscribe((data: Data) => {
			this.errorMessage = data['message'];
		});

	}

}
