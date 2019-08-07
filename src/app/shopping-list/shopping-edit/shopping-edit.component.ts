import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from './../shopping-list.service';
import { NgForm, Form } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormMode } from 'src/app/shared/form-mode.enum';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

	// shopping list form (static true since we use it on the ngOnInit hook)
	@ViewChild('shoppingListForm', { static : true })
	private shoppingListForm: NgForm;

	// reference to the submit button (static false since we do not use it on the ngOnInit hook)
	@ViewChild('submitButton', { static : false })
	private submitButton: ElementRef;

	// subscription to the shopping list service's sendIngredientIndex Subject
	private sendIngredientIndexSubscription: Subscription;

	// edit mode flag
	private editMode: boolean = false;

	// field to track currently selected ingredient
	private ingredientIndex: number;

	// get shopping list service singleton
    constructor(private shoppingListService: ShoppingListService) {

	}

	// on initialization
    ngOnInit() {

		// subscribe to the sendIngredientIndex Subject and listen for sent ingredient indexes
		this.sendIngredientIndexSubscription = this.shoppingListService.sendIngredientIndex.subscribe((index: number) => {

			// if we were not on update mode
			if (!this.editMode) {

				// set the index field to the emitted one
				this.ingredientIndex = index;

				// set the update mode (change button text and toggle the edit mode flag to true)
				this.setMode(FormMode.Update);

				// and the load the form data
				this.loadForm(index);

			}

			// when the emitted index becomes different than the one this component has stores
			if (this.ingredientIndex !== index) {

				// set the new index
				this.ingredientIndex = index;

				// and load the form data
				this.loadForm(index);

			}

		});

	}
	
	// listener for the submission button click
	onSubmitClick(): void {

		let name: string;

		// check through the edit mode flag if we were on 'add' or 'update' mode
		// on 'add', simply access the form value to fetch the ingredient name
		// on 'update' access the value from the control itself (we can't access the value of disabled text fields)
		if (!this.editMode) {
			name = this.shoppingListForm.form.value.ingredientName;
		} else {
			name = this.shoppingListForm.controls['ingredientName'].value;
		}
		
		// fetch the ingredient amount
		const amount: number = +this.shoppingListForm.form.value.ingredientAmount;

		// add the ingredient through the service and set information whether we are 'adding' or 'updating'
		this.shoppingListService.addIngredient(new Ingredient(name, amount), this.editMode);

		// clear the form
		this.clearForm();
		
	}

	// when clicking the clear button, simply call the clear form method
	onClearClick(): void {
		this.clearForm();
	}

	// when deleting, call the service delete method and pass the currently selected ingredient index
	onDeleteClick(): void {
		this.shoppingListService.deleteIngredient(this.ingredientIndex);
	}

	// clear form
	private clearForm() {

		// reset the ingredient name (make it pristine)
		this.shoppingListForm.controls['ingredientName'].reset();

		// set the ingredient amount to the original value
		this.shoppingListForm.form.patchValue({
			'ingredientAmount': 1
		});

		// set the 'add' mode (change the button text and set edit mode flag to false)
		this.setMode(FormMode.Add);

	}

	// load form based on index
	private loadForm(index: number): void {

		// use the service and call the getter method to fetch the ingredient
		const ingredient = this.shoppingListService.getIngredient(index);

		// set the form to the fetched ingredient fields
		this.shoppingListForm.setValue({
			'ingredientName': ingredient.name,
			'ingredientAmount': ingredient.amount
		});

	}

	// set mode
	private setMode(mode: FormMode) {

		switch (mode) {

			// on 'add': set edit mode to false and make the submit button have the 'add' text
			// on 'update': set edit mode to true and make the submit button have the 'update' text
			case FormMode.Add: 
				this.editMode = false;
				this.submitButton.nativeElement.textContent = 'Add';
				break;
			case FormMode.Update:
				this.editMode = true;
				this.submitButton.nativeElement.textContent = 'Update';
				break;
			default:
				this.editMode = false;
				this.submitButton.nativeElement.textContent = 'Add';
				break;

		}

	}

	// when destroying the component, unsubscribe from the sendIngredientIndex subject
	ngOnDestroy(): void {
		this.sendIngredientIndexSubscription.unsubscribe();
	}

}
