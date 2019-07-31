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

	// add a server to the servers array (on app root component)
	// how can we access it so we can push?

	// when serverCreated() from the child component emits data, it will be caught by this
	// method, labeled as 'serverData': now we can use that caught data from the child component
	// to push it to our array
	onServerAdded(serverData: {serverName: string, serverContent: string}) {
		this.serverElements.push({
			type: 'server',
			name: serverData.serverName,
			content: serverData.serverContent
		});
	}

	// add a new blueprint to the servers array (on app root component)
	// how can we access it so we can push?

	// when blueprintCreated() from the child component emits data, it will be caught by this
	// method, labeled as 'blueprintData': now we can use that caught data from the child component
	// to push it to our array
	onBlueprintAdded(blueprintData: {serverName: string, serverContent: string}) {
		this.serverElements.push({
			type: 'blueprint',
			name: blueprintData.serverName,
			content: blueprintData.serverContent
		});
	}

	// component lifecycle demo: change first server element
	onChangeFirst(): void {
		this.serverElements[0].name = 'Changed';
	}

	// component lifecycle demo: delete first server element
	onDestroyFirst(): void {
		this.serverElements.splice(0, 1);
	}

}
