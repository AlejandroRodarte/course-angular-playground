import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	// @ViewChild to access local reference of NgForm
	@ViewChild('f', { static : false })
	private signupForm: NgForm;

	// default select question: Your first pet?
	private defaultQuestion: string = 'pet';

	// default text area value
	answer: string = '';

	// gender options for radio button
	genders = ['male', 'female'];

	suggestUserName() {
		const suggestedName = 'Superuser';
	}

	// handler: get the NgForm object that the FormsModule created for us
	// onSubmit(form: NgForm) {
	// 	console.log(form);
	// }

	// log the NgForm
	onSubmit(): void {
		console.log(this.signupForm);
	}

}
