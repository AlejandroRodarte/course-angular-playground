import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router, ActivatedRoute } from '@angular/router';

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
	// inject the application router
	// inject the route that loaded this component: in this case, localhost:4200/servers
	constructor(private serversService: ServersService,
				private router: Router,
				private route: ActivatedRoute) { 

	}

	// on initialization: get a reference to the servers service
	ngOnInit() {
		this.servers = this.serversService.getServers();
	}

	// onReload() handler
	onReload() {

		// navigate to 'servers', relative to the loaded path
		// localhost:4200/servers/servers

		// this.router.navigate(['servers'], {
		// 	relativeTo: this.route
		// });

	}

}
