import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from '@angular/router';

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
	constructor(private serversService: ServersService,
				private route: ActivatedRoute) { 
		
	}

	// on initialization, render the first server by getting it from 
	// the getter of the servers service
	ngOnInit() {
		
		// first way of fetching query parameters and fragmets
		// access the snapshost url: will only load once
		console.log(this.route.snapshot.queryParams);
		console.log(this.route.snapshot.fragment);

		// if we desire to react to url changes after the component has been loaded
		// we need to subscribe to the queryParams and fragment observables
		this.route.queryParams.subscribe();
		this.route.fragment.subscribe();

		this.server = this.serversService.getServer(1);
		this.serverName = this.server.name;
		this.serverStatus = this.server.status;

	}

	// onUpdateServer handler: use the server service to update the server with the given id
	onUpdateServer() {
		this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
	}

}
