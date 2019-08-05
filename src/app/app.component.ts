import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	// access the NgForm object
	@ViewChild('f', { static : false })
	private form: NgForm;

	// template to store form results
	formData = {
		email: '',
		subscription: '',
		password: ''
	}

	// subscription types
	private subscriptionTypes: string[] = [
		'Basic',
		'Advanced',
		'Pro'
	]

	// default subscription type: Basic
	private defaultSubscriptionOption: string = this.subscriptionTypes[0];

	// on submit, store form results on the template object literal
	onSubmit(): void {
		this.formData.email = this.form.value.email;
		this.formData.subscription = this.form.value.subscription;
		this.formData.password = this.form.value.password;
	}

}
