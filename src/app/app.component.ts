import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	// genders on radio buttons
	genders = ['male', 'female'];
	
	// variable to store the form: must be of type FormGroup
	signupForm: FormGroup;

	ngOnInit(): void {

		// controls go inside object literal as key/value pairs
		// key: form control name
		// value: a FormControl object

		// FormControl arguments
		// default control value
		// on 'gender', we set the initial radio button value: 'male'

		// second argument: validator or array of validators
		// Validators.required: check if input is not empty
		// Validators.email: check if input is an email

		// we can nest FormGroup inside FormGroups
		// userData: FormGroup that will contain the username and email controls

		// how to access username with the get() method: get(userData.username)
		// how to access email with the get() method: get(userData.email)

		// hobbies: a form array (array of text inputs)
		this.signupForm = new FormGroup({

			'userData': new FormGroup({
				'username': new FormControl(null, Validators.required),
				'email': new FormControl(null, [Validators.required, Validators.email])
			}),

			'gender': new FormControl(this.genders[0]),

			'hobbies': new FormArray([])

		});

	}

	// on submission, log signup form
	onSubmit(): void {
		console.log(this.signupForm);
	}

	// FormArray extends from AbstractControl, so it is, in essence an array of controls where you can
	// apply the method push() to add new form controls on the fly
	onAddHobby(): void {
		this.getFormArray('hobbies').push(new FormControl(null, Validators.required));
	}

	// to iterate through the controls properly, we require an array of abstract controls, so we get the form array and fetch
	// and fetch the controls property, which returns such array to iterate on the *ngFor directive 
	getControls(path: string) {
		return this.getFormArray(path).controls;
	}

	// get a form array
	// get() returns an AbstractControl originally, but since we are fetching the 'hobbies' array of controls
	// we explicitly cast this method so it returns the FormArray value
	private getFormArray(path: string) {
		return <FormArray> this.signupForm.get(path);
	}

}
