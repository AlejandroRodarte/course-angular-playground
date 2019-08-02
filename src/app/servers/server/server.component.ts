import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';

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
	constructor(private serversService: ServersService) { 
		
	}

	// on initialization, get the first server in the array through the service
	ngOnInit() {
		this.server = this.serversService.getServer(1);
	}

}
