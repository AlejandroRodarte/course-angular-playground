import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

// home component
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	// we can inject the application global router
	// inject authentication service
	constructor(private router: Router,
				private authService: AuthService) { 

	}

	ngOnInit() {
		
	}

	onLoadServer(id: number): void {

		// ...perform some complicated algorithm

		// access the router an navigate to localhost:4200/servers
		this.router.navigate(
			['/servers', id, 'edit'], { 
			queryParams: { 
				allowEdit: '1' 
			}, 
			fragment: 'loading' 
		});

	}

	// on login handler, login
	onLogin(): void {
		this.authService.login();
	}

	// on logout handler, logout
	onLogout(): void {
		this.authService.logout();
	}

}
