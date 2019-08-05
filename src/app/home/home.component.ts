import { Component, OnInit, OnDestroy } from '@angular/core';

// import interval function since it is a way to create a new observable 
import { interval, Subscription, Observable, Observer } from 'rxjs';

// operator method map
import { map, filter } from 'rxjs/operators';

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
		const customIntervalObservable: Observable<number> = Observable.create((observer: Observer<number>) => {

			let count = 0;

			setInterval(() => {

				// emit regular data with next()
				observer.next(count);

				// emit completed notification with complete()
				if (count === 15) {
					observer.complete();
				}

				// emit error data with error()
				if (count > 19) {
					observer.error(new Error('Count is greater than 3. The apocalypsis is upon us.'))
				}

				count++;

			}, 1000);

		});

		// subscribe() accepts three arguments: all arrow functions
		// 1. handler for observer.next()
		// 2. handler for observer.error()
		// 3. handler for observer.complete()

		// every observable has a pipe() method, where we can insert some operator type, such as map()
		// map() accepts a project function to transform each piece of emitted data

		// workflow:
		// 1. recieve raw data (number) in the pipe()
		// 2. inside the pipe(), apply the map() function to alter the information and format it to a string
		// 3. subscribe() to the piped data (string) and log it

		// note: pipe() accepts an unlimited amount of operators, so more operators after map() can exist

		// filter() accepts a predicate which is a method that returns true or false with criteria to filter out some data
		this.firstObsSubscription = customIntervalObservable
			.pipe(filter((data: number): boolean => {
				return data % 2 === 0;
			}), map((data: number): string => {
				return 'Round: ' + (data + 1);
			}))
			.subscribe((data: string) => {
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
