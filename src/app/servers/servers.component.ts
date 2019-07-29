import { Component, OnInit } from '@angular/core';

// servers @component definition
// the supported selectors are by tag name, tag attribute and class name
@Component({
    // selector: 'app-servers',
    // selector: '[app-servers]',
    selector: 'app-servers',
    templateUrl: './servers.component.html',
    styleUrls: ['./servers.component.css']
})

export class ServersComponent implements OnInit {

    // new boolean property: will be bind to the 'disabled' property of the button element
    allowNewServer: boolean = false;

    // string property
    serverCreationStatus: string = 'No server was created!';

    // server name property
    serverName: string = '';

    // constructor: after 2 seconds, set the boolean field to true
    constructor() { 
        setTimeout(() => {
            this.allowNewServer = true;
        }, 2000)
    }

    ngOnInit() {

    }

    // event handler: set the serverCreationStatus text
    onCreateServer(): void {
        this.serverCreationStatus = 'Server was created!';
    }

    // event handler: receives the event object (similar to vanilla JS)
    // (<HTMLInputElement>event.target).value: inform the event comes from an input elements
    // so we can access the value
    onUpdateServerName(event: Event): void {
        this.serverName = (<HTMLInputElement>event.target).value;
    }

}
