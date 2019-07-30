// import the @Component decorator
import { Component } from '@angular/core';

// before declaring the component class definition, we inform Angular that this class
// is an Angular component (Angular will instantiate this class when we load the app)
// selector : parent node selector to find on app.componet.html to inject the compoent template
// templateUrl : HTML template of the component
// styleUrls : array of paths to CSS stylesheets for the component
@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrls: ['./server.component.css']
})

// custom component : server component
export class ServerComponent {

    // two class fields: server id and server status
    serverId: number = 10;
    serverStatus: string = 'offline';

    // constructor : set a random status value
    constructor() {
        this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
    }

    // method: get server status
    getServerStatus(): string {
        return this.serverStatus;
    }

    // method: get color
    // if status is online, set green color, if not, set red
    getColor(): string {
        return this.serverStatus === 'online' ? 'green' : 'red';
    }

}