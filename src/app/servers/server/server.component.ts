import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params } from '@angular/router';

// server component
@Component({
	selector: 'app-server',
	templateUrl: './server.component.html',
	styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

	// server instance
	server: {id: number, name: string, status: string};

	// inject the servers service
	constructor(private serversService: ServersService,
				private route: ActivatedRoute) { 
		
	}

	// on initialization
	ngOnInit() {

		// parsing id to number and getting the server by id through the service
		const id = +this.route.snapshot.params['id'];
		this.server = this.serversService.getServer(id);

		// subscribe to the params observable to listen for changes in the id dynamic part of the path
		this.route.params.subscribe((params: Params) => {
			this.server = this.serversService.getServer(+params['id']);
		});

	}

}
