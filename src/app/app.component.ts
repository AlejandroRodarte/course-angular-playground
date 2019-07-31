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
	
	// property that holds the current feature
	feature: string = 'recipes';

	// event handler triggered when data is emitted from the header
	// set the new feature to display
	setFeature(feature: string): void {
		this.feature = feature;
	}

}
