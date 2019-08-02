import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// home component
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	// we can inject the application global router
	constructor(private router: Router) { 

	}

	ngOnInit() {
		
	}

	onLoadServers(): void {

		// ...perform some complicated algorithm

		// access the router an navigate to localhost:4200/servers
		this.router.navigate(['/servers']);

	}

}
