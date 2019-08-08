import { Pipe, PipeTransform } from '@angular/core';
import { ServerProps } from './app.component';

// filter pipe
@Pipe({
	  name: 'filter',
	  pure: false
})
export class FilterPipe implements PipeTransform {

	transform(servers: ServerProps[], filterString: string, propertyName: string): ServerProps[] {

		// if array is empty or filter string is empty, return the whole array
		if (servers.length === 0 || filterString === '') {
			return servers;
		}

		const filteredServers: ServerProps[] = [];

		// for each server
		for (const server of servers) {

			// search if the value of the property passed in matches the filter string
			// example: if propertyName = 'status' and the filter string is 'stable' it will check if
			// server['status'] === filter

			// if there is a match, push the server object to the initialzied array
			if (server[propertyName] === filterString) {
				filteredServers.push(server);
			}

		}

		// return the filtered servers
		return filteredServers;

	}

}
