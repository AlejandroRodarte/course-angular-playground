import { Component } from '@angular/core';

// app component
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	// array of timer values
	timerValues: number[] = [];

	// event handler triggered when data is emitted from the game control component
	// push the new timer value to the array
	onCounterIncrement(data: { counter: number }): void {
		this.timerValues.push(data.counter);
	}

}
