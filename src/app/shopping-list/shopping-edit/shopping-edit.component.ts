import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from './../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormMode } from 'src/app/shared/form-mode.enum';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

// shopping edit component
@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

	// shopping list form (static true since we use it on the ngOnInit hook)
	@ViewChild('shoppingListForm', { static : true })
	private shoppingListForm: NgForm;

	// reference to the submit button (static true since we do not use it on the ngOnInit hook)
	@ViewChild('submitButton', { static : true })
	private submitButton: ElementRef;

	// subscription to the shopping list state data
	stateSubscription: Subscription;

	// edit mode flag
	editMode: boolean = false;

	// ingredient object to edit
	private editedIngredient: Ingredient;

	// ingredient index to edit
	private editedIngredientIndex: number;

	// inject the store from the shopping list reducer perspective
	constructor(private store: Store<fromShoppingList.AppState>) {

	}

	// on initialization
    ngOnInit() {

		// subscribe to the shopping list state
		this.stateSubscription = this.store.select('shoppingList').subscribe((stateData: fromShoppingList.ShoppingListReducerState) => {

			// ingredient index to edit state value is valid:
			// store state data in our class properties for future use, set mode to 'update' mode
			// and load form
			if (stateData.editedIngredientIndex > -1) {
				this.editedIngredient = stateData.editedIngredient;
				this.editedIngredientIndex = stateData.editedIngredientIndex;
				this.setMode(FormMode.Update);
				this.loadForm();
			}
		

		});

	}
	
	// submission handler
	onSubmit(): void {

		// name variable
		let name: string;

		// if not editing (add mode), extract the form value normallu
		// if editing (update mode, input disabled), extract the value from the control
		if (!this.editMode) {
			name = this.shoppingListForm.form.value.name;
		} else {
			name = this.shoppingListForm.controls['name'].value;
		}
		
		// fetch the ingredient amount
		const amount: number = +this.shoppingListForm.form.value.amount;

		// if editing, dispatch a new UpdateIngredient action
		// if adding, dispatch a new AddIngredient action
		if (this.editMode) {
			this.store.dispatch(new ShoppingListActions.UpdateIngredient({
				index: this.editedIngredientIndex,
				ingredient: new Ingredient(name, amount)
			}));
		} else {
			this.store.dispatch(new ShoppingListActions.AddIngredient(new Ingredient(name, amount)));
		}

		// clear the form
		this.clearForm();
		
	}

	// clear handler: clear the form (reset to 'add' mode and clear edit flag)
	// and dispatch a StopEdit action to reset the editedIngredient and editedIngredientIndex values
	// to their initial form (null and -1)
	onClearClick(): void {
		this.clearForm();
		this.store.dispatch(new ShoppingListActions.StopEdit());
	}

	
	// when deleting an ingredient: dispatch a DeleteIngredient action and clear the form
	onDeleteClick(): void {
		this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedIngredientIndex));
		this.clearForm();
	}

	// clear form
	private clearForm() {

		// reset the ingredient name (make it pristine)
		this.shoppingListForm.controls['name'].reset();

		// set the ingredient amount to the original value
		this.shoppingListForm.form.patchValue({
			'amount': 1
		});

		// set the 'add' mode
		this.setMode(FormMode.Add);

	}

	// load form
	private loadForm(): void {

		// initial ingredient name and amount
		let ingredientName: string = '';
		let ingredientAmount: number = 1;

		// if we have an ingredient object to edit on, set their values to the variables
		if (this.editedIngredient) {
			ingredientName = this.editedIngredient.name;
			ingredientAmount = this.editedIngredient.amount;
		}

		// set the form
		this.shoppingListForm.setValue({
			'name': ingredientName,
			'amount': ingredientAmount
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

	// unsubscriptions and dispatch StopEdit action for safety measures
	ngOnDestroy(): void {
		this.stateSubscription.unsubscribe();
		this.store.dispatch(new ShoppingListActions.StopEdit());
	}

}
