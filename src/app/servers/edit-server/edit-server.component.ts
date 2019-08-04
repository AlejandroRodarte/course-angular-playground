import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

// edit server component
// we will attempt to leave the path that loads this component, so this component
// should implement the CanComponentDeactivate, which requires it to run some code
// before actually leaving
@Component({
	selector: 'app-edit-server',
	templateUrl: './edit-server.component.html',
	styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {

	// server instance
	server: {id: number, name: string, status: string};

	// server name and status properties
	serverName = '';
	serverStatus = '';

	// allowEdit query parameter
	allowEdit: boolean = false;

	// boolean to know whenever the user updated server information
	changesSaved: boolean = false;

	// inject the servers global service
	// the route is ensured to be localhost:4200/id/edit
	// but we don't have access here to the allowEdit query param we had when loading the ServerComponent
	constructor(private serversService: ServersService,
				private route: ActivatedRoute,
				private router: Router) { 
		
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

		// set the changesSaved boolean to true
		this.changesSaved = true;

		// navigate one level up relative to the current route path
		this.router.navigate(['../'], {
			relativeTo: this.route
		});

	}

	// canDeactivate() implementation as a deactivable component
	canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {

		// if the user was not allowed to edit, allow the user to leave
		if (!this.allowEdit) {
			return true;
		}

		// if the user did change the data AND did not actuallu updated the data
		// it could possible mean that the user wrote new data on the input fields and clicked on another button without saving
		// so we will ask the user if he really wants to leave 

		// if the user did not change the data or he did update through the button, allow the user to leave
		if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
			return confirm('Do you want to discard the changes?')
		} else {
			return true;
		}

	}

}
