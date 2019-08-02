// servers global service
export class ServersService {

	// array of servers
	private servers = [
		{
			id: 1,
			name: 'Productionserver',
			status: 'online'
		},
		{
			id: 2,
			name: 'Testserver',
			status: 'offline'
		},
		{
			id: 3,
			name: 'Devserver',
			status: 'offline'
		}
		
	];

	// get a pointer to the array of servers
	getServers() {
		return this.servers;
	}

	// get server by id
	getServer(id: number) {

		const server = this.servers.find((s) => {
			return s.id === id;
		});

		return server;

	}

	// update server by id
	updateServer(id: number, serverInfo: {name: string, status: string}) {

		// attempt to find the server
		const server = this.servers.find((s) => {
			return s.id === id;
		});

		// if found, set the new values
		if (server) {
			server.name = serverInfo.name;
			server.status = serverInfo.status;
		}
		
	}

}
