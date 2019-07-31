import { Component } from '@angular/core';

// app component
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	// array of server elements (the cockpit component requires it)
	serverElements = [];

}
