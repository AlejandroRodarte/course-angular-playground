import { Component, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	suggestUserName() {
		const suggestedName = 'Superuser';
	}

	// handler: get the NgForm object that the FormsModule created for us
	onSubmit(form: NgForm) {
		console.log(form);
	}

}
