import { Component, OnInit, OnDestroy } from '@angular/core';

// import interval function since it is a way to create a new observable 
import { interval, Subscription, Observable, Observer } from 'rxjs';

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

	// on initialization
	ngOnInit() {
		
		// subscribe to the interval() observer and print out the emitted
		// count value
		// this.firstObsSubscription = interval(1000).subscribe(count => {
		// 	console.log(count);
		// })

		// create a custom observable
		// call Observable.create and pass in an arrow function
		// rxjs will automatically inject the observer that listens to us
		// this observer should be of type Observer and pass as a generic the type of data that
		// this observer expects

		// this arrow function simplt returns to the observer the value of the count variable each second

		// next() is to send data, error() is to send error data, and complete() is to send completion data
		const customIntervalObservable = Observable.create((observer: Observer<number>) => {

			let count = 0;

			setInterval(() => {
				observer.next(count);
				count++;
			}, 1000);

		});

		this.firstObsSubscription = customIntervalObservable.subscribe((data: number) => {
			console.log(data);
		})

	}

	// upon leaving the component, unsubscribe from all subscriptions
	ngOnDestroy() {
		this.firstObsSubscription.unsubscribe();
	}

}
