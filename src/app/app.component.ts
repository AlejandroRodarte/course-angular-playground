import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

type AsyncValidatorResponse = { [key: string]: boolean } | null;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	loadingGifUrl = 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif';

	projectForm: FormGroup;

	projectStatuses: string[] = [
		'Stable',
		'Critical',
		'Finished'
	];

	ngOnInit(): void {

		this.projectForm = new FormGroup({
			'projectName': new FormControl(null, Validators.required, this.forbiddenProjectName),
			'email': new FormControl(null, [Validators.required, Validators.email]),
			'projectStatus': new FormControl(this.projectStatuses[0])
		});

	}

	onSubmit(): void {
		console.log(this.projectForm);
	}

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
