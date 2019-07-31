import { Component } from '@angular/core';
import { ServerElement } from './server-element/server-element.component';

// app component
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	// array of server elements (the cockpit component requires it)
	serverElements: ServerElement[] = [{
		type: 'server',
		name: 'TestServer',
		content: 'Just a test!'
	}];

}
