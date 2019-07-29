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

    // constructor: after 2 seconds, set the boolean field to true
    constructor() { 
        setTimeout(() => {
            this.allowNewServer = true;
        }, 2000)
    }

    ngOnInit() {

    }

}
