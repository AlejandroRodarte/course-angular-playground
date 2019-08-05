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

				// emit regular data with next()
				observer.next(count);

				// emit completed notification with complete()
				if (count === 2) {
					observer.complete();
				}

				// emit error data with error()
				if (count > 3) {
					observer.error(new Error('Count is greater than 3. The apocalypsis is upon us.'))
				}

				count++;

			}, 1000);

		});

		// subscribe() accepts three arguments: all arrow functions
		// 1. handler for observer.next()
		// 2. handler for observer.error()
		// 3. handler for observer.complete()
		this.firstObsSubscription = customIntervalObservable.subscribe((data: number) => {
			console.log(data);
		}, (error: Error) => {
			console.log(error);
			alert(error.message);
		}, () => {
			console.log('task completed: doing some cleanup work...')
		});

	}

	// upon leaving the component, unsubscribe from all subscriptions
	ngOnDestroy() {
		this.firstObsSubscription.unsubscribe();
	}

}
