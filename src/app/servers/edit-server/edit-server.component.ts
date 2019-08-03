import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params } from '@angular/router';

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

	// allowEdit query parameter
	allowEdit: boolean = false;

	// inject the servers global service
	// the route is ensured to be localhost:4200/id/edit
	// but we don't have access here to the allowEdit query param we had when loading the ServerComponent
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

		// fetch the allowEdit query param
		// if its value is 1, set to true, else, set to false
		this.route.queryParams.subscribe((queryParams: Params) => {
			this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
		});

		this.route.fragment.subscribe();

		// each time this component is loaded (and allowed to edit)
		if (this.allowEdit) {

			// we will fetch the server id
			const id = +this.route.snapshot.params['id'];
	
			// and get the server
			this.server = this.serversService.getServer(id);
	
			// and set the serverName and serverStatus fields to the fetched server
			// since this is two-way data-binding, their values will be also present on their respective inputs
			this.serverName = this.server.name;
			this.serverStatus = this.server.status;

		}

	}

	// onUpdateServer handler: use the server service to update the server with the given id
	onUpdateServer() {
		this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
	}

}
