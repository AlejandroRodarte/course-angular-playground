import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

// reponse of async validator: either null or an object of key strings and boolean values
type AsyncValidatorResponse = { [key: string]: boolean } | null;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	// loading gif url 
	loadingGifUrl = 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif';

	// form object
	projectForm: FormGroup;

	// project statuses
	projectStatuses: string[] = [
		'Stable',
		'Critical',
		'Finished'
	];

	ngOnInit(): void {

		// three fields on form
		// 1. project name: required synchronous validation and forbiddenProjectName async validation
		// 2. emial: required and email synchronous validations
		// 3. projectStatus: initialitize dropdwn on first option (Stable)
		this.projectForm = new FormGroup({
			'projectName': new FormControl(null, Validators.required, this.forbiddenProjectName),
			'email': new FormControl(null, [Validators.required, Validators.email]),
			'projectStatus': new FormControl(this.projectStatuses[0])
		});

	}

	// on submit, log info on console
	onSubmit(): void {
		console.log(this.projectForm);
	}

	// async validator: simply check if project name matches hardcoded string to either resolve null or set a custom error code
	forbiddenProjectName(control: FormControl): Promise<AsyncValidatorResponse> | Observable<AsyncValidatorResponse> {
		return new Promise<AsyncValidatorResponse>((resolve, reject) => {
			setTimeout(() => {
				if (control.value === 'Test') {
					resolve({
						'invalidProjectName': true
					});
				} else {
					resolve(null);
				}
			}, 1000);
		});
	}

}
