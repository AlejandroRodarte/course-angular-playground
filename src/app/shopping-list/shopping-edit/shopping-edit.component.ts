import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

	// reference to the input html elements
	@ViewChild('ingredientNameInput', { static : false })
	ingredientName: ElementRef;

	@ViewChild('ingredientAmountInput', { static : false })
	ingredientAmount: ElementRef;

	// create a new emitter for the shopping list component html to listen
	@Output()
	sendNewIngredient = new EventEmitter<Ingredient>();

    constructor() { }

    ngOnInit() {
	}
	
	// listener for the submission button click
	onSubmitClick(): void {

		// capture the ingredient name and amount
		const name: string = this.ingredientName.nativeElement.value;
		const amount: number = this.ingredientAmount.nativeElement.value;

		// if not empty, send the new ingredient and clear the fields
		if (name && amount) {
			this.sendNewIngredient.emit(new Ingredient(name, amount));
			this.ingredientName.nativeElement.value = '';
			this.ingredientAmount.nativeElement.value = '';
		}
		
	}

}
