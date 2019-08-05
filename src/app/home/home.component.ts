import { Component, OnInit, OnDestroy } from '@angular/core';

// import interval function since it is a way to create a new observable 
import { interval, Subscription } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

	// store subscription
	private firstObsSubscription: Subscription;

	constructor() { 

	}

	// on initialization, subscribe to the interval() observer and print out the emitted
	// count value
	ngOnInit() {
		this.firstObsSubscription = interval(1000).subscribe(count => {
			console.log(count);
		})
	}

	// upon leaving the component, unsubscribe from all subscriptions
	ngOnDestroy() {
		this.firstObsSubscription.unsubscribe();
	}

}
