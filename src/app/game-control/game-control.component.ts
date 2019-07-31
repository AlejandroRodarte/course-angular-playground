import { Component, OnInit, EventEmitter, Output } from '@angular/core';

// game control component
@Component({
	selector: 'app-game-control',
	templateUrl: './game-control.component.html',
	styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

	// basic counter
	counter: number = 0;

	// timer
	timer: NodeJS.Timer;

	// output an event emitter for the root component to listen
	// will send the current timer value
	@Output()
	onIncrement = new EventEmitter<{ counter: number }>();

	constructor() {
		
	}

	ngOnInit() {

	}

	// start game, set a new interval
	// call each second the event emitter and emit to parent component the current counter value
	startGame(): void {
		this.timer = setInterval(() => {
			this.onIncrement.emit({ counter: this.counter++ })
		}, 1000);
	}

	// stop game, clear the timer
	stopGame(): void {
		clearInterval(this.timer);
	}

}