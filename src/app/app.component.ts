import { Component } from '@angular/core';

// app component
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

	// array of numbers
	numbers = [1, 2, 3, 4, 5];

	// odd numbers array
	oddNumbers = [1, 3, 5];

	// even numbers array
	evenNumbers = [2, 4];
	
	// toggle for only odd numbers
	onlyOdd = false;

	value = 5;
	
}
