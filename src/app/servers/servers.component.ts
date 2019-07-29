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

    // constructor: after 2 seconds, set the boolean field to true
    constructor() { 
        setTimeout(() => {
            this.allowNewServer = true;
        }, 2000)
    }

    ngOnInit() {

    }

    // event handler: set the serverCreationStatus text
    onCreateServer() {
        this.serverCreationStatus = 'Server was created!';
    }

}
