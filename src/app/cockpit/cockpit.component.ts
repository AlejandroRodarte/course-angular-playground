import { Component, OnInit } from '@angular/core';

// cockpit component
@Component({
	selector: 'app-cockpit',
	templateUrl: './cockpit.component.html',
	styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

	// server name and server content
  	newServerName = '';
	newServerContent = '';

	constructor() { }

	ngOnInit() {
	}

	// add a server to the servers array (on app root component)
	// how can we access it so we can push?
  	onAddServer() {
		this.serverElements.push({
			type: 'server',
			name: this.newServerName,
			content: this.newServerContent
		});
	}

	// add a new blueprint to the servers array (on app root component)
	// how can we access it so we can push?
	onAddBlueprint() {
		this.serverElements.push({
			type: 'blueprint',
			name: this.newServerName,
			content: this.newServerContent
		});
	}

}
