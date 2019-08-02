import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';

// edit server component
@Component({
	selector: 'app-edit-server',
	templateUrl: './edit-server.component.html',
	styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {

	// server instance
	server: {id: number, name: string, status: string};

	// server name and status properties
	serverName = '';
	serverStatus = '';

	// inject the servers global service
	constructor(private serversService: ServersService) { 
		
	}

	// on initialization, render the first server by getting it from 
	// the getter of the servers service
	ngOnInit() {
		this.server = this.serversService.getServer(1);
		this.serverName = this.server.name;
		this.serverStatus = this.server.status;
	}

	// onUpdateServer handler: use the server service to update the server with the given id
	onUpdateServer() {
		this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
	}

}
