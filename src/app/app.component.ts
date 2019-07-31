// component parent node selector goes here
// component class definition goes here

import { Component } from '@angular/core';

// this component will go inside an <app-root> html tag found on the index.html page
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

// component class definition
export class AppComponent {
	
	// property that holds the current section
	section: string;

	// display the recipes section by default
	constructor() {
		this.section = 'recipes';
	}

	// event handler triggered when data is emitted from the header
	// set the new section to display
	setSection(data: { section: string }): void {
		this.section = data.section;
	}

}
