import { Component, OnInit, Input } from '@angular/core';

// even component
@Component({
	selector: 'app-even',
	templateUrl: './even.component.html',
	styleUrls: ['./even.component.css']
})
export class EvenComponent implements OnInit {

	// accessing the current timer value iteration from the root component
	@Input()
	value: number;

	constructor() { }

	ngOnInit() {
		
	}

}
