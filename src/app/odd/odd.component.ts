import { Component, OnInit, Input } from '@angular/core';

// odd component
@Component({
    selector: 'app-odd',
    templateUrl: './odd.component.html',
    styleUrls: ['./odd.component.css']
})
export class OddComponent implements OnInit {
    
    // fetching the current timer value from the root component 
	@Input()
	value: number;

    constructor() { }

    ngOnInit() {
    }

}
