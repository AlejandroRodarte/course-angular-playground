import { Component, OnInit, EventEmitter, Output } from '@angular/core';

// cockpit component
@Component({
	selector: 'app-cockpit',
	templateUrl: './cockpit.component.html',
	styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

	// serverCreated: event emitter that will be used on the parent component to communicate information
	// @Output: allows us to output this property from this class for parent components to use
	@Output()
	serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();

	// blueprintCreated: event emitter that will be used on the parent component to communicate information
	// @Output: allows us to output this property from this class for parent components to use
	@Output('bpCreated')
	blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();

	// server name and server content
	newServerContent = '';

	constructor() { }

	ngOnInit() {
	}

	// add a server to the servers array (on app root component)
	// how can we access it so we can push?

	// when the add server button from the cockpit.component.html is clicked, it will
	// use the event emitter to call the emit() method and transmit some data that will be outputted
	// to some parent component

	// using local reference of an html input element to access the input's value that holds the name
  	onAddServer(nameInput: HTMLInputElement) {
		this.serverCreated.emit({
			serverName: nameInput.value,
			serverContent: this.newServerContent
		});
	}

	// add a new blueprint to the servers array (on app root component)
	// how can we access it so we can push?

	// when the add blueprint button from the cockpit.component.html is clicked, it will
	// use the event emitter to call the emit() method and transmit some data that will be outputted
	// to some parent component

	// using local reference of an html input element to access the input's value that holds the name
	onAddBlueprint(nameInput: HTMLInputElement) {
		this.blueprintCreated.emit({
			serverName: nameInput.value,
			serverContent: this.newServerContent
		});
	}

}
