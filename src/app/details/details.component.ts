import { Component } from '@angular/core';

// details component
@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent {

    // details string
    private details: string = 'secret password = yourmomgay';

    // toggle
    private toggle: boolean;

    // counter
    private counter: number;

    // logs array
    private logs: number[];

    // initialize fields
    constructor() {
        this.toggle = false;
        this.counter = 0;
        this.logs = [];
    }

    // on toggle handler: swap the toggle value, increment the counter
    // assign the counter value to the logs array 
    onToggle(): void {
        this.toggle = !this.toggle;
        this.counter++;
        this.logs.push(this.counter);
    }

    // after fifth element: return boolean that checks for the current logItem being looped on the *ngFor directive
    afterFifth(logItem: number): boolean {
        return logItem >= 5;
    }

    // set blue: check for current value of logItem being looped on the *ngFor directive and set a color
    setBlue(logItem: number): string {
        return logItem >= 5 ? 'blue' : '';
    }

}