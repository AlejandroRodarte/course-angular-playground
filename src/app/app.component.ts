import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

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

	// forbidden usernames
	forbiddenUsernames: string[] = ['Chris', 'Anna'];

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

		// append forbiddenNames custom validator method reference
		// inside that method we make a call to 'this', where such method is called not from our class, but by Angular outside
		// so we need to bind this class instance so no problems persists

		// third argument of FormControl constructor: aynschronous validator method references
		this.signupForm = new FormGroup({

			'userData': new FormGroup({
				'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
				'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
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

	// custom validator: a regular method
	forbiddenNames(control: FormControl): { [key: string]: boolean } {

		// check if the control value to validate is contained on any of the forbidden names
		// if true, send an object with the nameIsForbidden key set to true
		if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
			return {
				'nameIsForbidden': true
			}
		}

		// if not, it means the username is fine, so return null for the error
		return null;

	}

	// asynchronous validators which can await for an asynchronous task to be resolved
	// can resolve either null of an object will string keys and boolean values
	forbiddenEmails(control: FormControl): Promise<{ [key: string]: boolean | null }> | Observable<{ [key: string]: boolean | null }> {

		// return new promise that
		return new Promise<{ [key: string]: boolean | null }>((resolve, reject) => {

			// will wait for a timeout
			setTimeout(() => {

				// after such timeout if the email matches some hardcoded value
				if (control.value === 'test@test.com') {

					// if validation fails, we can resolve by sending the error code
					resolve({
						'emailIsForbidden': true
					});

				} else {
					// if validation succeeds, we can resolve to null
					resolve(null);
				}

			}, 1500);

		});

	}

}
