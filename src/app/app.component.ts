import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
		this.signupForm = new FormGroup({
			'username': new FormControl(null),
			'email': new FormControl(null),
			'gender': new FormControl(this.genders[0])
		});

	}

}
