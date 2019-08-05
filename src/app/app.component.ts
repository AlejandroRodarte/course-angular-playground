import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user/user.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

	// boolean
	userActivated: boolean = false;

	// subscription
	private activatedSub: Subscription;

	// inject user service
	constructor(private userService: UserService) {

	}

	// subscribe to activatedEmitter subject from service (active observable)
	// and store the boolean value on the userActivated field
	ngOnInit() {
		this.activatedSub = this.userService.activatedEmitter.subscribe((didActivate: boolean): void => {
			this.userActivated = didActivate;
		})
	}

	// unsubscribe from subject
	ngOnDestroy() {
		this.activatedSub.unsubscribe();
	}
	
}
