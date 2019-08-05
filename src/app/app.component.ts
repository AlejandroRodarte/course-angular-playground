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

	// suggest username handler
	suggestUserName() {

		const suggestedName = 'Superuser';

		// setValue(): forces us to override the whole form
		// we declare a JS object and use the names we places for this form objects/groups
		// this.signupForm.setValue({
		// 	userData: {
		// 		username: suggestedName,
		// 		email: ''
		// 	},
		// 	secret: 'pet',
		// 	questionAnswer: '',
		// 	gender: 'male'
		// });

		// patchValue(): override parts of our form
		this.signupForm.form.patchValue({
			userData: {
				username: suggestedName
			}
		});

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
