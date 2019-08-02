import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';

// servers component
@Component({
	selector: 'app-servers',
	templateUrl: './servers.component.html',
	styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

	// reference to the array of servers that the service has
	private servers: {id: number, name: string, status: string}[] = [];

	// inject the servers service singleton
	constructor(private serversService: ServersService) { 

	}

	// on initialization: get a reference to the servers service
	ngOnInit() {
		this.servers = this.serversService.getServers();
	}

}
