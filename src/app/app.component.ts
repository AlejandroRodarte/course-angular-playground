import { Component } from '@angular/core';

export interface ServerProps {
	instanceType: string;
	name: string;
	status: string;
	started: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	filteredStatus: string = '';

	// promise to resolve to a string
	appStatus = new Promise<string>((resolve, reject) => {

		setTimeout(() => {
			resolve('stable');
		}, 2000)

	});

	servers: ServerProps[] = [
		{
			instanceType: 'medium',
			name: 'Production Server',
			status: 'stable',
			started: new Date(15, 1, 2017)
		},
		{
			instanceType: 'large',
			name: 'User Database',
			status: 'stable',
			started: new Date(15, 1, 2017)
		},
		{
			instanceType: 'small',
			name: 'Development Server',
			status: 'offline',
			started: new Date(15, 1, 2017)
		},
		{
			instanceType: 'small',
			name: 'Testing Environment Server',
			status: 'stable',
			started: new Date(15, 1, 2017)
		}
	];

	getStatusClasses(server: ServerProps) {
		return {
			'list-group-item-success': server.status === 'stable',
			'list-group-item-warning': server.status === 'offline',
			'list-group-item-danger': server.status === 'critical'
		};
	}

	onAddServer(): void {

		this.servers.push({
			instanceType: 'small',
			name: 'New Server',
			status: 'stable',
			started: new Date(15, 1, 2017)
		});

	}

}
